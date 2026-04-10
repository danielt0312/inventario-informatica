<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Producto extends Model
{
    use HasFactory;

    protected string $table = 'productos';

    protected array $fillable = [
        'tipo_id',
        'marca_id',
        'nombre'
    ];

    public bool $timestamps = false;

    public function tipo(): BelongsTo {
        return $this->belongsTo(ProductoTipo::class, 'tipo_id');
    }

    public function marca(): BelongsTo {
        return $this->belongsTo(ProductoMarca::class, 'marca_id');
    }
}
