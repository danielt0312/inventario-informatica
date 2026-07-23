<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Traits\Models\HasArchivable;

class Factura extends Model
{
    use HasArchivable;

    protected $fillable = [
        'fecha_emision',
    ];

    public $timestamps = false;
}
