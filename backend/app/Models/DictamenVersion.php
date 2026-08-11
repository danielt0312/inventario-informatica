<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\{
    BelongsTo,
    HasMany,
};

use App\Traits\Models\HasArchivable;

class DictamenVersion extends Model
{
    use HasArchivable;

    protected $fillable = [
        'numero_version',
        'dictamen_id',
        'oficio_id',
        'fecha_solicitud',
        'motivo_cambio'
    ];

    protected $attributes = [
        'numero_version' => 1,
        'oficio_id' => null,
        'motivo_cambio' => null
    ];

    public function dictamen(): BelongsTo
    {
        return $this->belongsTo(Dictamen::class);
    }

    public function oficio(): BelongsTo
    {
        return $this->belongsTo(Oficio::class);
    }

    public function adquisiciones(): HasMany
    {
        return $this->hasMany(DictamenAdquisicion::class);
    }

    public function casts(): array
    {
        return [
            'fecha_solicitud' => 'date:Y-m-d'
        ];
    }
}
