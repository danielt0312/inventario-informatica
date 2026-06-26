<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\{BelongsTo, HasMany};
use Illuminate\Database\Eloquent\Concerns\HasUuids;

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
        'estado_id',
        'oficio_id',
        'documento_id',
        'adscripcion_id',
        'user_id',
        'fecha_solicitud'
    ];

    protected $attributes = [
        'estado_id' => DictamenEstadoEnum::DICTAMINAR->value
    ];

    public function estado(): BelongsTo
    {
        return $this->belongsTo(DictamenEstado::class, 'estado_id');
    }

    public function oficio(): BelongsTo
    {
        return $this->belongsTo(Oficio::class);
    }

    public function documento(): BelongsTo
    {
        return $this->belongsTo(Documento::class, 'documento_id', 'archivo_id');
    }

    public function productos(): HasMany
    {
        return $this->hasMany(DictamenProducto::class, 'dictamen_id');
    }

    public function articulos(): HasMany
    {
        return $this->hasMany(DictamenArticulo::class);
    }

    public function casts(): array
    {
        return [
            'fecha_solicitud' => 'date:Y-m-d'
        ];
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
