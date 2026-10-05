<?php

namespace App\Actions;

use Illuminate\Container\Container;
use App\Services\ProductoService;
use App\Models\ProductoVariante;
use App\Data\Disco\StoreDiscoData;
use App\Data\Producto\{
    ProductoData,
    ProductoVarianteData,
    ProductoGenericoData,
};

final class CrearProductoVarianteAction
{
    private const ACCIONES = [
        StoreDiscoData::class => CrearDiscoAction::class,
    ];

    public function __construct(
        private ProductoService $productoService,
        private Container $container
    ) {}

    public function __invoke(ProductoVarianteData $data): ProductoVariante
    {
        if ($data instanceof ProductoGenericoData) {
            return $this->productoService->crearGenerico(
                ProductoData::from([...$data->toProductoIdentidad()->toArray(), 'tipoId' => $data->tipoId])
            );
        }

        $accion = self::ACCIONES[$data::class]
            ?? throw new LogicException('Sin acción para '.$data::class);

        return $this->container->make($accion)($data);
    }
}
