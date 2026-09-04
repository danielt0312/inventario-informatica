<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ResguardoArticulo extends Model
{
    protected $fillable = [
        'resguardo_id',
        'articulo_id',
        'fecha_asignacion',
        'fecha_cancelacion'
    ];

    public function articulo(): BelongsTo
    {
        return $this->belongsTo(Articulo::class);
    }

    public function resguardo(): BelongsTo
    {
        return $this->belongsTo(Resguardo::class);
    }

    protected function casts(): array
    {
        return [
            'fecha_asignacion' => 'date:Y-m-d',
            'fecha_cancelacion' => 'date:Y-m-d'
        ];
    }
}
