<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DiscoCapacidad extends Model
{
    protected $table = 'disco_capacidades';

    protected $fillable = [
        'nombre'
    ];

    public $timestamps = false;
}
