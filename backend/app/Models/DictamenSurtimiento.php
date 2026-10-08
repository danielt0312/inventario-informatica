<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DictamenSurtimiento extends Model
{
    protected $fillable = [
        'dictamen_adquisicion_id',
        'articulo_id',
        'es_resultado_esperado',
        'observaciones',
    ];

    protected $attributes = [
        'observaciones' => null
    ];

    public function dictamenAdquisicion(): BelongsTo
    {
        return $this->belongsTo(DictamenAdquisicion::class);
    }

    public function articulo(): BelongsTo
    {
        return $this->belongsTo(Articulo::class);
    }
}
