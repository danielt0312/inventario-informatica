<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RevisionConfiguracion extends Model
{
    protected $fillable = [
        'garantia',
        'basica_equipo',
        'impresora',
        'actualizacion_os',
        'actualizacion_antivirus',
        'correo',
        'internet_total',
        'internet_restringido',
    ];
}
