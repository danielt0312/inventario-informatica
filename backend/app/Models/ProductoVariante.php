<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\Models\HasResourceResponse;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;

use Illuminate\Database\Eloquent\Relations\{
    BelongsTo,
    MorphTo
};

class ProductoVariante extends Model
{
    use HasResourceResponse;

    protected $fillable = [
        'producto_id',
    ];

    public $timestamps = false;

    public function producto(): BelongsTo
    {
        return $this->belongsTo(Producto::class);
    }

    public function variante(): MorphTo
    {
        return $this->morphTo();
    }

    #[Scope]
    protected function genericas(Builder $query): Builder
    {
        return $query->whereNull('variante_type');
    }
}
