<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ArticuloRecepcion extends Model
{
    protected $primaryKey = 'articulo_id';
    public $incrementing = false;
    protected $keyType = 'bigint';
    public $timestamps = false;

    protected $fillable = [
        'resultado_esperado',
        'observaciones'
    ];

    protected $attributes = [
        'observaciones' => null
    ];

    public function articulo(): BelongsTo
    {
        return $this->belongsTo(Articulo::class);
    }
}
