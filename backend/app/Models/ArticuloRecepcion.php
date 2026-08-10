<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ArticuloRecepcion extends Model
{
    protected $primaryKey = 'articulo_id';
    protected $keyType = 'bigint';
    public $incrementing = false;

    protected $fillable = [
        'es_resultado_esperado',
        'observaciones'
    ];

    protected $attributes = [
        'observaciones' => null
    ];

    public function articulo(): BelongsTo
    {
        return $this->belongsTo(Articulo::class);
    }

    public function casts(): array
    {
        return [
            'es_resultado_esperado' => 'boolean',
        ];
    }
}
