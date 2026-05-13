<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DiscoTipo extends Model
{
    protected $table = 'disco_tipos';

    protected $fillable = [
        'nombre'
    ];

    public $timestamps = false;
}
