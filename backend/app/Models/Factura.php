<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use App\Traits\Models\HasDocumento;

class Factura extends Model
{
    use HasDocumento;

    protected $fillable = [
        'fecha_emision',
        'documento_id'
    ];

    public $timestamps = false;
}
