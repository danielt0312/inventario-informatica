<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Proveedor extends Model
{
    protected $fillable = [
        'rfc',
        'nombre',
    ];

    public function uniqueIds(): array
    {
        return ['rfc'];
    }
}
