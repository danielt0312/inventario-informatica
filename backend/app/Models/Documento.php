<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\{BelongsTo, MorphTo};

class Documento extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'tipo_id',
        'archivo_id',
    ];

    public function documentable(): MorphOne
    {
        return $this->morphTo();
    }

    public function tipo(): BelongsTo
    {
        return $this->belongsTo(DocumentoTipo::class);
    }

    public function archivo(): BelongsTo
    {
        return $this->belongsTo(Archivo::class);
    }
}
