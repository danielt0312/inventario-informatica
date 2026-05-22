<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DictamenProducto extends Model
{
    use HasFactory;

    protected $table = 'dictamen_productos';

    protected $fillable = [
        'dictamen_id',
        'user_id',
        'producto_id',
        'caracteristicas',
        'cantidad'
    ];

    public $timestamps = false;

    public function dictamen(): BelongsTo {
        return $this->belongsTo(Dictamen::class, 'dictamen_id');
    }

    public function user(): BelongsTo {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function producto(): BelongsTo {
        return $this->belongsTo(Producto::class, 'producto_id');
    }
}
