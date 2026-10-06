<?php

namespace App\Actions;

use Illuminate\Container\Container;
use App\Services\ProductoService;
use App\Models\ProductoVariante;
use App\Data\Disco\StoreDiscoData;
use App\Data\Ram\StoreRamData;
use App\Data\Computadora\StoreComputadoraData;
use App\Data\Licencia\StoreLicenciaData;
use App\Data\Camara\StoreCamaraData;
use App\Data\Producto\{
    ProductoData,
    ProductoVarianteData,
    ProductoGenericoData,
};

final class CrearProductoVarianteAction
{
    private const ACCIONES = [
        StoreDiscoData::class       => CrearDiscoAction::class,
        StoreRamData::class         => CrearRamAction::class,
        StoreComputadoraData::class => CrearComputadoraAction::class,
        StoreLicenciaData::class    => CrearLicenciaAction::class,
        StoreCamaraData::class      => CrearCamaraAction::class,
    ];

    public function __construct(
        private ProductoService $productoService,
        private Container $container
    ) {}

    public function __invoke(ProductoVarianteData $data): ProductoVariante
    {
        if ($data instanceof ProductoGenericoData) {
            return $this->productoService->crearGenerico(
                ProductoData::from([...$data->toProductoIdentidad()->toArray(), 'tipo_id' => $data->tipoId])
            );
        }

        $accion = self::ACCIONES[$data::class]
            ?? throw new LogicException('Sin acción para '.$data::class);

        return $this->container->make($accion)($data);
    }
}
