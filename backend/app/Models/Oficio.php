<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\Models\Relations\HasDocumentable;

class Oficio extends Model
{
    use HasDocumentable;

    protected $fillable = [
        'folio',
        'verified_at'
    ];
}
