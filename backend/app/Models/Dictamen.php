<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Casts\Attribute;
use App\Enums\DictamenEstadoEnum;
use App\Traits\Models\HasResourceResponse;

use Staudenmeir\EloquentHasManyDeep\{
    HasRelationships,
    HasManyDeep,
    HasOneDeep
};

use Illuminate\Database\Eloquent\Relations\{
    BelongsTo,
    HasOne,
    HasMany
};

class Dictamen extends Model
{
    use HasUuids, HasResourceResponse, HasRelationships;

    public function __call($method, $parameters)
    {
        if (Str::startsWith($method, 'esEstado')) {
            $estadoNombre = Str::after($method, 'esEstado');
            $enumCaseName = Str::studly($estadoNombre);
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
        'oficio_id',
        'orden_compra_id',
        'empleado_id',
        'tiene_observaciones',
    ];

    public function oficio(): BelongsTo
    {
        return $this->belongsTo(Oficio::class);
    }

    public function versiones(): HasMany
    {
        return $this->hasMany(DictamenVersion::class);
    }

    public function versionActual(): HasOne
    {
        return $this->hasOne(DictamenVersion::class)->latestOfMany('id');
    }

    public function archivo(): HasOneDeep
    {
        return $this->hasOneDeepFromRelations(
            $this->versionActual(),
            (new DictamenVersion)->archivo()
        );
    }

    public function ordenCompra(): BelongsTo
    {
        return $this->belongsTo(OrdenCompra::class);
    }

    public function adquisiciones(): HasManyDeep
    {
        return $this->hasManyDeepFromRelations(
            $this->versionActual(),
            (new DictamenVersion)->adquisiciones(),
        );
    }

    public function surtimientos(): HasManyDeep
    {
        return $this->hasManyDeepFromRelations(
            $this->versionActual(),
            (new DictamenVersion)->adquisiciones(),
            (new DictamenAdquisicion)->surtimientos(),
        );
    }

    public function articulos(): HasMany
    {
        return $this->hasMany(Articulo::class);
    }

    public function estado(): BelongsTo
    {
        return $this->belongsTo(DictamenEstado::class);
    }

    public function folio(): Attribute
    {
        return Attribute::make(
            fn (mixed $value, array $attributes) => "{$this->id}/{$this->versionActual->numero_version}"
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

    public function casts(): array
    {
        return [
            'tiene_observaciones' => 'boolean'
        ];
    }
}
