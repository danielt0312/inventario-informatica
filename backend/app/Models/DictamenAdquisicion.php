<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\{
    BelongsTo,
    BelongsToMany,
    HasMany
};
use Illuminate\Database\Eloquent\Casts\Attribute;
use App\Traits\Models\Relations\HasProductoVariante;

class DictamenAdquisicion extends Model
{
    use HasFactory, HasProductoVariante;

    protected $fillable = [
        'dictamen_version_id',
        'empleado_id',
        'producto_tipo_id',
        'producto_variante_id',
        'articulo_id',
        'cantidad',
        'especificaciones_tecnicas'
    ];

    public function version(): BelongsTo
    {
        return $this->belongsTo(DictamenVersion::class, 'dictamen_version_id');
    }

    public function empleado(): BelongsTo
    {
        return $this->belongsTo(Empleado::class);
    }

    public function productoTipo(): BelongsTo
    {
        return $this->belongsTo(ProductoTipo::class);
    }

    public function producto(): Attribute
    {
        return Attribute::make(
            fn (): Producto => $this->productoVariante?->producto
        );
    }

    public function articulo(): BelongsTo
    {
        return $this->belongsTo(Articulo::class);
    }

    public function surtimientos(): HasMany
    {
        return $this->hasMany(DictamenSurtimiento::class);
    }

    public function tipo(): Attribute
    {
        return Attribute::make(
            fn (mixed $value, array $attributes): ProductoTipo => $attributes['producto_variante_id']
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
            fn (mixed $value, array $attributes): string =>
                implode(' ', array_filter([
                    $this->tipo->nombre,
                    $this->marca?->nombre,
                    $this->producto?->modelo,
                    $attributes['especificaciones_tecnicas']
                ]))
        );
    }
}
