<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Casts\Attribute;

class DictamenAdquisicion extends Model
{
    use HasFactory;

    protected $fillable = [
        'dictamen_version_id',
        'empleado_id',
        'producto_id',
        'producto_tipo_id',
        'articulo_id',
        'cantidad',
        'caracteristicas'
    ];

    protected $attributes = [
        'producto_id' => null,
        'articulo_id' => null,
        'caracteristicas' => null
    ];

    public function version(): BelongsTo
    {
        return $this->belongsTo(DictamenVersion::class, 'dictamen_version_id');
    }

    public function empleado(): BelongsTo
    {
        return $this->belongsTo(Empleado::class);
    }

    public function producto(): BelongsTo
    {
        return $this->belongsTo(Producto::class);
    }

    public function productoTipo(): BelongsTo
    {
        return $this->belongsTo(ProductoTipo::class);
    }

    public function articulo(): BelongsTo
    {
        return $this->belongsTo(Articulo::class);
    }

    public function tipo(): Attribute
    {
        return Attribute::make(
            fn (mixed $value, array $attributes): ProductoTipo => $attributes['producto_id']
                ? $this->producto->tipo
                : $this->productoTipo
        );
    }

    public function categoria(): Attribute
    {
        return Attribute::make(
            fn (): ProductoCategoria => $this->tipo->categoria
        );
    }

    public function marca(): Attribute
    {
        return Attribute::make(
            fn (): ProductoMarca | null => $this->producto?->marca
        );
    }

    public function descripcion(): Attribute
    {
        return Attribute::make(
            fn (mixed $value, array $attributes) =>
                implode(' ', array_filter([
                    $this->tipo->nombre,
                    $this->marca?->nombre,
                    $this->producto?->nombre,
                    $attributes['caracteristicas']
                ]))
        );
    }
}
