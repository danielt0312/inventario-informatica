<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ProductoCategoria extends Model
{
    use HasFactory;

    protected string $table = 'producto_categorias';

    protected array $fillable = [
        'nombre',
    ];

    public bool $timestamps = false;
}

