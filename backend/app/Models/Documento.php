<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\{BelongsTo, HasOne};
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Documento extends Model
{
    use HasFactory;

    protected $with = ['archivo'];

    public $timestamps = false;

    protected $fillable = [
        'tipo_id',
        'archivo_id'
    ];

    public function tipo(): BelongsTo
    {
        return $this->belongsTo(DocumentoTipo::class);
    }

    public function archivo(): BelongsTo
    {
        return $this->belongsTo(Archivo::class);
    }

    public function oficio(): HasOne
    {
        return $this->hasOne(Oficio::class);
    }

    public function dictamen(): HasOne
    {
        return $this->hasOne(Dictamen::class);
    }

    public function factura(): HasOne
    {
        return $this->hasOne(Factura::class);
    }

    public function ordenCompra(): HasOne
    {
        return $this->hasOne(OrdenCompra::class);
    }
}
