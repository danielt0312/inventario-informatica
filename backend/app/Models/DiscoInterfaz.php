<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DiscoInterfaz extends Model
{
    protected $table = 'disco_interfaces';

    protected $fillable = [
        'nombre'
    ];

    public $timestamps = false;
}
