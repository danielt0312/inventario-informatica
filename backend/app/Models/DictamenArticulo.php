<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DictamenArticulo extends Model
{
    use HasFactory;

    protected $table = 'dictamen_articulos';

    protected $primaryKey = 'articulo_id';

    protected $fillable = [
        'articulo_id',
        'producto_id'
    ];

    public function articulo(): BelongsTo
    {
        return $this->belongsTo(Articulo::class, 'articulo_id');
    }

    public function producto(): BelongsTo
    {
        return $this->belongsTo(DictamenProducto::class, 'producto_id');
    }
}
