<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Proveedor extends Model
{
    protected $fillable = [
        'nombre',
    ];

    public function uniqueIds(): array
    {
        return ['nombre'];
    }
}
