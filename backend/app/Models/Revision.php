<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use App\Traits\Models\HasDocumentable;

class Revision extends Model
{
    use HasDocumentable;

    protected $fillable = [
        'empleado_id',
        'observaciones'
    ];

    protected $attributes = [
        'observaciones' => null,
    ];
}
