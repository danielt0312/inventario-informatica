<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ProductoMarca extends Model
{
    use HasFactory;

    protected string $table = 'producto_marcas';

    protected array $fillable = [
        'nombre',
    ];

    public bool $timestamps = false;
}
