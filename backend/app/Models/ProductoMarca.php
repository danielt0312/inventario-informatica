<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProductoMarca extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre'
    ];

    public $timestamps = false;

    public function modelos(): HasMany
    {
        return $this->hasMany(ProductoTipo::class, 'marca_id');
    }
}
