<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Casts\Attribute;

class DictamenProducto extends Model
{
    use HasFactory;

    protected $fillable = [
        'dictamen_id',
        'empleado_id',
        'producto_id',
        'producto_tipo_id',
        'numero_inventario',
        'cantidad',
        'caracteristicas'
    ];

    protected $attributes = [
        'producto_id' => null,
        'numero_inventario' => null,
        'caracteristicas' => null
    ];

    public $timestamps = false;

    public function dictamen(): BelongsTo
    {
        return $this->belongsTo(Dictamen::class);
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

    public function tipo(): Attribute
    {
        return Attribute::make(
            fn (mixed $value, array $attributes) => $attributes['producto_id']
                ? $this->producto->tipo
                : $this->productoTipo
        );
    }

    public function categoria(): Attribute
    {
        return Attribute::make(
            fn () => $this->tipo->categoria
        );
    }

    public function marca(): Attribute
    {
        return Attribute::make(
            fn () => $this->producto?->marca
        );
    }

    public function modelo(): Attribute
    {
        return Attribute::make(
            fn () => $this->producto
        );
    }

    public function descripcion(): Attribute
    {
        return Attribute::make(
            fn (mixed $value, array $attributes) =>
                implode(' ', array_filter([
                    $this->tipo->nombre,
                    $this->marca?->nombre,
                    $this->modelo?->nombre,
                    $attributes['caracteristicas']
                ]))
        );
    }
}
