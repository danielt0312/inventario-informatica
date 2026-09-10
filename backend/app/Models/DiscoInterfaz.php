<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\Models\HasResourceResponse;

class DiscoInterfaz extends Model
{
    use HasResourceResponse;

    protected $fillable = [
        'nombre'
    ];

    public $timestamps = false;
}
