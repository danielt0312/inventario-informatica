<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Disco extends Model
{
    protected $table = 'discos';

    protected $fillable = [
        'tipo_id',
        'capacidad_id',
        'interfaz_id'
    ];

    public function tipo(): BelongsTo {
        return $this->belongsTo(DiscoTipo::class, 'tipo_id');
    }

    public function capacidad(): BelongsTo {
        return $this->belongsTo(DiscoCapacidad::class, 'capacidad_id');
    }

    public function interfaz(): BelongsTo {
        return $this->belongsTo(DiscoInterfaz::class, 'interfaz_id');
    }
}
