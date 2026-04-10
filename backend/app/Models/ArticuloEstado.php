<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ArticuloEstado extends Model
{
    protected $table = 'articulo_estados';

    protected $fillable = [
        'nombre',
    ];

    public const ACTIVO_ID = 1;

    public function articulos() {
        return $this->hasMany(Articulo::class, 'estado_id');
    }
}
