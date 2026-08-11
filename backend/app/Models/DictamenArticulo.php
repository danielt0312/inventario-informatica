<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DictamenArticulo extends Model
{
    use HasFactory;

    protected $primaryKey = 'articulo_id';
    protected $keyType = 'bigint';
    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'articulo_id',
        'dictamen_id',
        'empleado_id'
    ];

    protected $attributes = [
        'empleado_id' => null
    ];

    public function dictamen(): BelongsTo
    {
        return $this->belongsTo(Dictamen::class);
    }

    public function articulo(): BelongsTo
    {
        return $this->belongsTo(Articulo::class);
    }
}
