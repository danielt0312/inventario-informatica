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
        'version',
        'dictamen_id',
        'oficio_id',
        'adscripcion_id',
        'fecha_solicitud',
    ];

    protected $attributes = [
        'version' => 1,
        'oficio_id' => null
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
