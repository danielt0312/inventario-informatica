<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProductoCategoria extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre'
    ];

    public $timestamps = false;

    public function tipos(): HasMany
    {
        return $this->hasMany(ProductoTipo::class, 'categoria_id');
    }
}

