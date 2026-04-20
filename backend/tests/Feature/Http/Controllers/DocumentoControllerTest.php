<?php

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

use App\Models\{User, Documento};
use App\{ArchivoTipoEnum, DocumentoTipoEnum};

beforeEach(function () {
    $this->user = User::factory()->create();
});

test('obtencion de datos', function () {
    Documento::factory()->count(1)->create();

    $response = $this->actingAs($this->user, 'sanctum')
        ->getJson('api/documentos');

    $response->assertStatus(200)
        ->assertJsonStructure([
            'data' => ['*' => [
                'tipo' => ['id', 'nombre'],
                'archivo' => ['id', 'nombre']
            ]]
        ]);
});

test('archivos pueden ser subidos', function () {
    // debe ser un nombre único para obtener su registro en la BD
    // no confundir con la propiedad `uuid` de `Archivo`
    $name = fake()->uuid();

    $filename = "{$name}.pdf";

    $this->actingAs($this->user, 'sanctum')
        ->postJson('api/documentos', [
            'tipo_id' => DocumentoTipoEnum::FACTURA->value,
            'archivo' => UploadedFile::fake()->create($filename, mimeType: 'application/pdf')
        ])
        ->assertCreated();

    $documento = Documento::join('archivos', 'documentos.archivo_id', '=', 'archivos.id')
        ->where('archivos.nombre', $name)
        ->firstOrFail();

    Storage::assertExists($documento->archivo->relative_path);
});
