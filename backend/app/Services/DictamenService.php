<?php

namespace App\Services;

use LogicException;
use Illuminate\Support\Facades\DB;

use App\Enums\{
    ProductoTipoEnum,
    DictamenEstadoEnum,
    DocumentoTipoEnum
};

use App\Models\{
    Archivo,
    Dictamen

};

use App\Actions\{
    ReemplazarArchivoAction,
    CancelarArchivoAction
};

use App\Data\Dictamen\{
    StoreDictamenData,
    DictaminarDictamenData,
    CorregirDictamenData
};

class DictamenService
{
    public function __construct(
        protected OficioService $oficioService,
        protected PdfViewService $pdfViewService,
        protected PdfWatermarkService $pdfWatermarkService,
        protected ArchivoService $archivoService,
        protected DocumentoService $documentoService,
        protected ReemplazarArchivoAction $reemplazarArchivoAction,
        protected CancelarArchivoAction $cancelarArchivoAction
    ) {}

    public function crear(StoreDictamenData $data, ?Archivo $oficioArchivo): Dictamen
    {
        $esAdscripcionInterna = $this->esAdscripcionInterna($data->adscripcionId);

        if ($esAdscripcionInterna && $oficioArchivo === null) {
            $this->oficioArchivoMissingFailure();
        }

        return DB::transaction(function () use ($data, $oficioArchivo, $esAdscripcionInterna) {
            $oficio = !$esAdscripcionInterna
                ? $this->oficioService->create($data->oficio, $oficioArchivo)
                : null;

            $dictamen = Dictamen::create([
                'estado_id' => DictamenEstadoEnum::Dictaminar->value,
                'empleado_id' => 1, // todo obtener jefe de adscripcion interna
                'adscripcion_id' => $data->adscripcionId,
                'oficio_id' => $oficio?->id
            ]);

            $nuevaVersion = $dictamen->versiones()->create([
                'fecha_solicitud' => $data->version->fechaSolicitud,
            ]);

            $nuevaVersion->adquisiciones()->createMany($data->adquisiciones);

            $dictamen->versionActual()->associate($nuevaVersion);
            $dictamen->save();

            return $dictamen;
        });
    }

    public function dictaminar(Dictamen $dictamen, DictaminarDictamenData $data): void
    {
        DB::transaction(function () use ($dictamen, $data) {
            foreach ($data->adquisiciones as $adquisicion) {
                $dictamen->versionActual->adquisiciones()
                    ->where('id', $adquisicion->id)
                    ->update([
                        'producto_tipo_id' => null,
                        'producto_variante_id' => $adquisicion->productoVarianteId,
                        'especificaciones_tecnicas' => $adquisicion->especificacionesTecnicas
                    ]);
            }

            $this->generateAndAssociatePdf($dictamen);

            $dictamen->update([
                'estado_id' => DictamenEstadoEnum::PendienteAcuse->value
            ]);
        });
    }

    public function evidenciarAcuse(Dictamen $dictamen, Archivo $dictamenArchivo, ?Archivo $oficioArchivo): void
    {
        $oficioTieneAcuse = $dictamen->oficio->verified_at !== null;
        if (! $oficioTieneAcuse && $oficioArchivo === null) {
            $this->oficioArchivoMissingFailure();
        }

        DB::transaction(function () use ($dictamen, $dictamenArchivo, $oficioTieneAcuse, $oficioArchivo) {
            if (! $oficioTieneAcuse) {
                ($this->reemplazarArchivoAction)($dictamen->oficio->archivo, $oficioArchivo);

                $dictamen->oficio->update(['verified_at' => now()]);
            }

            ($this->reemplazarArchivoAction)($dictamen->versionActual->archivo, $dictamenArchivo);

            $dictamen->update([
                'estado_id' => DictamenEstadoEnum::Surtir->value
            ]);
        });
    }

    public function surtir(Dictamen $dictamen): void
    {
        $dictamen->update([
            'estado_id' => DictamenEstadoEnum::Inventariar->value
        ]);
    }

    public function corregir(Dictamen $dictamen, CorregirDictamenData $data): void
    {
        DB::transaction(function () use ($dictamen, $data) {
            ($this->cancelarArchivoAction)($dictamen->versionActual->archivo);

            $dictamen->versionActual->update(['motivo_cambio' => $data->motivoCambio]);

            $nuevaVersion = $dictamen->versiones()->create([
                'numero_version' => $dictamen->versionActual->numero_version + 1,
                'fecha_solicitud' => now(),
            ]);

            $nuevaVersion->adquisiciones()->createMany($data->adquisiciones);

            $dictamen->versionActual()->associate($nuevaVersion)->save();

            $this->generateAndAssociatePdf($dictamen);

            $dictamen->update([
                'estado_id' => DictamenEstadoEnum::PendienteAcuse->value
            ]);
        });
    }

    protected function generateAndAssociatePdf(Dictamen $dictamen): void
    {
        $archivo = $this->generatePdf($dictamen);

        $this->documentoService->createForModel($dictamen->versionActual, $archivo);
    }

    protected function generatePdf(Dictamen $dictamen): Archivo
    {
        $dictamen->load('versionActual.adquisiciones', 'oficio');

        return $this->archivoService->createAndStoreFileFromRaw(
            $this->loadPdfView($dictamen)->output(),
            $this->generatePdfArchivoNombre($dictamen),
            'pdf'
        );
    }

    protected function loadPdfView(Dictamen $dictamen, ?string $title = null, ?string $location = null, ?string $date = null, ?string $fileTitle = null)
    {
        $title ??= DocumentoTipoEnum::DictamenVersion->getLabelValue();
        $location ??= 'Ciudad Victoria, Tamaulipas';
        $date ??= now()->isoFormat('D [de] MMMM [de] YYYY');
        $fileTitle ??= $title;

        return $this->pdfViewService->loadView('dictamen', compact('dictamen', 'title', 'location', 'date', 'fileTitle'));
    }

    protected function generatePdfArchivoNombre(Dictamen $dictamen): string
    {
        return sprintf('%s - No. %s',
            DocumentoTipoEnum::DictamenVersion->getLabelValue(),
            $dictamen->folio
        );
    }

    public function esAdscripcionInterna(int $adscripcionId): bool
    {
        // todo identificar si el area de adscripcion es la interna
        // todo revisar si mover a otra seccion
        return $adscripcionId === 2;
    }

    protected function oficioArchivoMissingFailure(): void
    {
        throw new LogicException('El archivo del oficio de solicitud es requerido.');
    }

    public function productoTipoPuedeRequerirNumeroInventario(ProductoTipoEnum $tipo): bool
    {
        return match($tipo) {
            ProductoTipoEnum::Disco,
            ProductoTipoEnum::Ram,
            ProductoTipoEnum::Bocina,
            ProductoTipoEnum::Monitor,
            ProductoTipoEnum::DiscoOptico,
            ProductoTipoEnum::Teclado,
            ProductoTipoEnum::Mouse => true,
            default => false
        };
    }
}
