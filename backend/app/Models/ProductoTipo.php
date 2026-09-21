<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductoTipo extends Model
{
    protected $fillable = [
        'categoria_id',
        'nombre',
        'es_tangible',
    ];

    public $timestamps = false;

    public function categoria(): BelongsTo
    {
        return $this->belongsTo(ProductoCategoria::class);
    }

    public function casts(): array
    {
        return [
            'es_tangible' => 'boolean',
        ];
    }
}
