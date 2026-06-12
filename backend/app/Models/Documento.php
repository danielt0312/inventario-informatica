<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\{BelongsTo, HasOne};
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Documento extends Model
{
    use HasFactory;

    protected $table = 'documentos';

    protected $primaryKey = 'archivo_id';

    public $incrementing = false;

    protected $keyType = 'int';

    protected $with = ['archivo'];

    protected $fillable = [
        'tipo_id',
        'archivo_id'
    ];

    public $timestamps = false;

    public function tipo(): BelongsTo
    {
        return $this->belongsTo(DocumentoTipo::class, 'tipo_id');
    }

    public function archivo(): BelongsTo
    {
        return $this->belongsTo(Archivo::class, 'archivo_id');
    }

    public function oficio(): HasOne
    {
        return $this->hasOne(Oficio::class, 'documento_id', 'archivo_id');
    }

    public function dictamen(): HasOne
    {
        return $this->hasOne(Dictamen::class, 'documento_id', 'archivo_id');
    }

    public function factura(): HasOne
    {
        return $this->hasOne(Factura::class, 'documento_id', 'archivo_id');
    }
}
