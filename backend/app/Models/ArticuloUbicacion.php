<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ArticuloUbicacion extends Model
{
    protected $fillable = [
        'articulo_id',
        'area_id',
        'fecha_inicio',
        'fecha_fin'
    ];

    protected $attributes = [
        'fecha_fin' => NULL
    ];

    public function casts(): array
    {
        return [
            'fecha_inicio' => 'date:Y-m-d',
            'fecha_fin' => 'date:Y-m-d'
        ];
    }
}
