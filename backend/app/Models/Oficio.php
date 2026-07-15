<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

use App\Traits\Models\HasDocumento;

class Oficio extends Model
{
    use HasFactory, HasDocumento;

    protected $fillable = [
        'folio'
    ];

    public $timestamps = false;
}
