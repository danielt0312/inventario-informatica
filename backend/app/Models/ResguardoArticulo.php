<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class ResguardoArticulo extends Model
{
    protected $fillable = [
        'resguardo_id',
        'articulo_id',
        'fecha_asignacion',
        'fecha_cancelacion'
    ];

    protected $attributes = [
        'fecha_cancelacion' => null
    ];

    public function articulo(): BelongsTo
    {
        return $this->belongsTo(Articulo::class);
    }

    public function resguardo(): BelongsTo
    {
        return $this->belongsTo(Resguardo::class);
    }
}
