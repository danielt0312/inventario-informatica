<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\{
    HasMany,
    BelongsTo
};

use App\Traits\Models\HasResourceResponse;
use App\Traits\Models\Relations\HasDocumentable;

class Resguardo extends Model
{
    use HasDocumentable, HasResourceResponse;

    protected $fillable = [
        'estado_id',
        'empleado_id',
        'fecha_actualizacion',
        'fecha_cancelacion',
    ];

    public function estado(): BelongsTo
    {
        return $this->belongsTo(ResguardoEstado::class);
    }

    public function articulosResguardados(): HasMany
    {
        return $this->hasMany(ResguardoArticulo::class);
    }
}
