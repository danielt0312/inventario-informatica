<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Traits\Models\HasDocumento;

class Factura extends Model
{
    use HasDocumento;

    protected $fillable = [
        'fecha_emision',
    ];

    public $timestamps = false;
}
