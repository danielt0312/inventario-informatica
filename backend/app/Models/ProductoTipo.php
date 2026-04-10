<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ProductoTipo extends Model
{
    use HasFactory;

    protected $table = 'producto_tipos';

    protected $fillable = [
        'categoria_id',
        'nombre'
    ];

    public $timestamps = false;

    public function categoria(): BelongsTo {
        return $this->belongsTo(ProductoCategoria::class, 'categoria_id');
    }
}
