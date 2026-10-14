<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use App\Traits\Models\Relations\HasProductoVariante;
use App\Services\CuentaContableService;

use Illuminate\Database\Eloquent\Relations\{
    BelongsTo,
    HasOne,
    HasMany
};

class Articulo extends Model
{
    use HasUuids, HasProductoVariante;

    protected $fillable = [
        'producto_variante_id',
        'estado_id',
        'numero_serie',
        'costo_unitario',
        'factura_id',
        'qr_archivo_id',
        'cuenta_contable',
        'dictamen_id',
    ];

    protected $attributes = [
        'numero_serie' => null,
        'costo_unitario' => null,
        'factura_id' => null,
        'qr_archivo_id' => null,
        'cuenta_contable' => null,
        'dictamen_id' => null,
    ];

    public function ubicaciones(): HasMany
    {
        return $this->hasMany(ArticuloUbicacion::class);
    }

    public function ubicacionActual(): HasOne
    {
        return $this->ubicaciones()->one()->ofMany();
    }

    public function dictamen(): BelongsTo
    {
        return $this->belongsTo(Dictamen::class);
    }

    public function surtimiento(): HasOne
    {
        return $this->hasOne(DictamenSurtimiento::class);
    }

    public function estado(): BelongsTo
    {
        return $this->belongsTo(ArticuloEstado::class);
    }

    public function factura(): BelongsTo
    {
        return $this->belongsTo(Factura::class);
    }

    public function qrArchivo(): BelongsTo
    {
        return $this->belongsTo(Archivo::class);
    }

    public function esInventariable(): Attribute
    {
        return Attribute::get(
            fn () => $this->cuenta_contable === null
                ? null
                : CuentaContableService::esInventariable($this->cuenta_contable)
        );
    }

    public function uniqueIds(): array
    {
        return ['uuid'];
    }

    public function getRouteKeyName(): string
    {
        return 'uuid';
    }
}
