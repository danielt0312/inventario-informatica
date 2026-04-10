<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Documento extends Model
{
    use HasFactory;

    protected $table = 'documentos';

    protected $fillable = [
        'tipo_id',
        'archivo_id',
    ];

    public $timestamps = false;

    public function tipo(): BelongsTo {
        return $this->belongsTo(ArchivoTipo::class, 'tipo_id');
    }

    public function archivo(): BelongsTo {
        return $this->belongsTo(Archivo::class, 'archivo_id');
    }
}
