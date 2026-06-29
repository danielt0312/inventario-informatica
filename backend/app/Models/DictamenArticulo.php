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
        'dictamen_producto_id'
    ];

    public function dictamenProducto(): BelongsTo
    {
        return $this->belongsTo(DictamenProducto::class);
    }
}
