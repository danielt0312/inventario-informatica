<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

use App\Traits\Models\HasArchivable;

class Oficio extends Model
{
    use HasFactory, HasArchivable;

    protected $fillable = [
        'folio',
    ];

    public $timestamps = false;
}
