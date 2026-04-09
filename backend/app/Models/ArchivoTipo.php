<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ArchivoTipo extends Model
{
    protected $table = 'archivo_tipos';

    protected $fillable = [
        'nombre',
        'extension'
    ];

    public function archivos() {
        return $this->belongsTo(Archivo::class);
    }
}
