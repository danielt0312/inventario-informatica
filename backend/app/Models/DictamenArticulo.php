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
        'dictamen_id'
    ];

    public function articulo(): BelongsTo {
        return $this->belongsTo(Articulo::class, 'articulo_id');
    }

    public function dictamen(): BelongsTo {
        return $this->belongsTo(Dictamen::class, 'dictamen_id');
    }
}
