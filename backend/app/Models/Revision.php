<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use App\Traits\Models\HasArchivable;

class Revision extends Model
{
    use HasArchivable;

    protected $fillable = [
        'empleado_id',
        'observaciones'
    ];

    protected $attributes = [
        'observaciones' => null,
    ];
}
