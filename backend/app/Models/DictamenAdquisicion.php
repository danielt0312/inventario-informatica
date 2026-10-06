<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\{
    BelongsTo,
    HasMany
};
use Illuminate\Database\Eloquent\Casts\Attribute;
use App\Traits\Models\Relations\HasProductoVariante;

class DictamenAdquisicion extends Model
{
    use HasProductoVariante;

    protected $fillable = [
        'dictamen_version_id',
        'empleado_id',
        'producto_variante_id',
        'articulo_id',
        'cantidad',
        'caracteristicas_adicionales',
        'detalle_solicitud',
        'borrador_producto_variante',
    ];

    protected $attributes = [
        'detalle_solicitud' => null,
        'producto_variante_id' => null,
        'articulo_id' => null,
        'caracteristicas_adicionales' => null
    ];

    public function version(): BelongsTo
    {
        return $this->belongsTo(DictamenVersion::class, 'dictamen_version_id');
    }

    public function empleado(): BelongsTo
    {
        return $this->belongsTo(Empleado::class);
    }

    public function articulo(): BelongsTo
    {
        return $this->belongsTo(Articulo::class);
    }

    public function surtimientos(): HasMany
    {
        return $this->hasMany(DictamenSurtimiento::class);
    }

    public function descripcion(): Attribute
    {
        return Attribute::make(
            fn (mixed $value, array $attributes): string | null =>
                $attributes['producto_variante_id']
                    ? str_compact_join(
                        $this->productoVariante->producto->tipo->nombre,
                        $this->productoVariante->descripcion,
                        $attributes['caracteristicas_adicionales']
                    )
                    : null
        );
    }
}
