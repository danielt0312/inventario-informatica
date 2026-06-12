<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

use App\Traits\Models\HasArticulo;

class DictamenArticulo extends Model
{
    use HasFactory, HasArticulo;

    protected $fillable = [
        'articulo_id',
        'producto_id'
    ];

    public function producto(): BelongsTo
    {
        return $this->belongsTo(DictamenProducto::class, 'producto_id');
    }
}
