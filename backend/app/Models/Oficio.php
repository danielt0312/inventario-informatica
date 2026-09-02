<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\{
    BelongsTo,
    HasOne
};

use App\Traits\Models\HasDocumentable;

class Oficio extends Model
{
    use HasFactory, HasDocumentable;

    protected $fillable = [
        'folio',
        'verified_at'
    ];

    public function dictamen(): HasOne
    {
        return $this->hasOne(Dictamen::class);
    }
}
