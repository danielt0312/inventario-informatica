<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Oficio extends Model
{
    use HasFactory;

    protected $fillable = [
        'documento_id',
        'folio'
    ];

    public $timestamps = false;

    public function documento(): BelongsTo
    {
        return $this->belongsTo(Documento::class, 'documento_id', 'archivo_id');
    }
}
