<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\{
    BelongsTo,
    HasMany,
    HasManyThrough
};

use App\Enums\DictamenEstadoEnum;

class Dictamen extends Model
{
    use HasFactory, HasUuids;

    public function __call($method, $parameters)
    {
        if (Str::startsWith($method, 'esEstado')) {
            $statusName = Str::after($method, 'esEstado');
            $enumCaseName = strtoupper(Str::snake($statusName));
            $enumClass = DictamenEstadoEnum::class;

            if (defined("$enumClass::$enumCaseName")) {
                $enumCase = constant("$enumClass::$enumCaseName");
                return $enumCase->value === $this->estado_id;
            }
        }

        return parent::__call($method, $parameters);
    }

    protected $fillable = [
        'version_id',
        'estado_id',
        'orden_compra_id',
        'user_id',
    ];

    protected $attributes = [
        'estado_id' => DictamenEstadoEnum::DICTAMINAR->value,
        'version_id' => null,
        'orden_compra_id' => null,
    ];

    public function versiones(): HasMany
    {
        return $this->hasMany(DictamenVersion::class);
    }

    public function version(): BelongsTo
    {
        return $this->belongsTo(DictamenVersion::class);
    }

    public function ordenCompra(): BelongsTo
    {
        return $this->belongsTo(OrdenCompra::class);
    }

    public function dictamenArticulos(): HasMany
    {
        return $this->hasMany(DictamenArticulo::class);
    }

    public function articulos(): HasManyThrough
    {
        return $this->hasManyThrough(
            Articulo::class,
            DictamenArticulo::class,
            // 'dictamen_id',
            // 'id',
            // 'id',
            // 'articulo_id'
        );
    }

    public function estado(): BelongsTo
    {
        return $this->belongsTo(DictamenEstado::class);
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
