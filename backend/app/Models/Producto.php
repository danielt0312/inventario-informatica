<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\{
    BelongsTo,
    HasMany
};

class Producto extends Model
{
    protected $fillable = [
        'tipo_id',
        'marca_id',
        'modelo'
    ];

    public $timestamps = false;

    public function tipo(): BelongsTo
    {
        return $this->belongsTo(ProductoTipo::class, 'tipo_id');
    }

    public function marca(): BelongsTo
    {
        return $this->belongsTo(ProductoMarca::class, 'marca_id');
    }

    public function variantes(): HasMany
    {
        return $this->hasMany(ProductoVariante::class);
    }
}
