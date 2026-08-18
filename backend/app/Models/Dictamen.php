<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\{BelongsTo, HasMany};

use App\Enums\DictamenEstadoEnum;
use App\Traits\Models\HasResourceResponse;

class Dictamen extends Model
{
    use HasFactory, HasUuids, HasResourceResponse;

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
        'version_actual_id',
        'estado_id',
        'adscripcion_id',
        'orden_compra_id',
        'empleado_id',
        'tiene_observaciones',
    ];

    protected $attributes = [
        'estado_id' => DictamenEstadoEnum::DICTAMINAR->value,
        'version_actual_id' => null,
        'orden_compra_id' => null,
        'tiene_observaciones' => null
    ];

    public function versiones(): HasMany
    {
        return $this->hasMany(DictamenVersion::class);
    }

    public function versionActual(): BelongsTo
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
