<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\{BelongsTo, HasMany};
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

use App\Enums\DictamenEstadoEnum;

class Dictamen extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'dictamenes';

    protected $fillable = [
        'estado_id',
        'oficio_id',
        'documento_id',
        'adscripcion_id',
        'user_id',
        'fecha_solicitud'
    ];

    protected $attributes = [
        'estado_id' => DictamenEstadoEnum::POR_DICTAMINAR->value
    ];

    public function estado(): BelongsTo {
        return $this->belongsTo(DictamenEstado::class, 'estado_id');
    }

    public function oficio(): BelongsTo {
        return $this->belongsTo(Oficio::class, 'oficio_id');
    }

    public function documento(): BelongsTo {
        return $this->belongsTo(Documento::class, 'documento_id');
    }

    public function productos(): HasMany {
        return $this->hasMany(DictamenProducto::class, 'dictamen_id');
    }

    public function casts(): array {
        return [
            'fecha_solicitud' => 'date:Y-m-d'
        ];
    }

    public function uniqueIds(): array {
        return ['uuid'];
    }
}
