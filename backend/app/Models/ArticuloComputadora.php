<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ArticuloComputadora extends Model
{
    protected $fillable = [
        'procesador_id'
    ];

    public $timestamps = false;
}
