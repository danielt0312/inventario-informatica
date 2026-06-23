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
        'cantidad',
        'caracteristicas'
    ];

    public $timestamps = false;

    public function dictamen(): BelongsTo
    {
        return $this->belongsTo(Dictamen::class, 'dictamen_id');
    }

    public function empleado(): BelongsTo
    {
        return $this->belongsTo(Empleado::class, 'empleado_id');
    }

    public function producto(): BelongsTo
    {
        return $this->belongsTo(Producto::class, 'producto_id');
    }

    public function productoTipo(): BelongsTo
    {
        return $this->belongsTo(ProductoTipo::class);
    }

    public function descripcion(): Attribute
    {
        return Attribute::make(
            function (mixed $value, array $attributes) {
                $producto = $this->producto;

                return "{$this->productoTipo->nombre} {$producto->marca->nombre} {$producto->nombre} {$attributes['caracteristicas']}";
            }
        );
    }
}
