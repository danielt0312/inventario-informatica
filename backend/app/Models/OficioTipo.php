<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OficioTipo extends Model
{
    use HasFactory;

    protected $table = 'oficio_tipos';

    protected $fillable = [
        'nombre'
    ];

    public $timestamps = false;
}
