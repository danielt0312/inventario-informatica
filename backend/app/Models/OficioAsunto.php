<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OficioAsunto extends Model
{
    use HasFactory;

    protected $table = 'oficio_asuntos';

    protected $fillable = [
        'tipo_id',
        'nombre'
    ];

    public $timestamps = false;

    public function tipo(): BelongsTo {
        return $this->belongsTo(OficioTipo::class, 'tipo_id');
    }
}
