<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Disco extends Model
{
    protected $fillable = [
        'tipo_id',
        'capacidad_id',
        'interfaz_id',
    ];

    protected $attributes = [
        'interfaz_id' => null,
    ];

    public $timestamps = false;

    public function tipo(): BelongsTo
    {
        return $this->belongsTo(DiscoTipo::class);
    }

    public function capacidad(): BelongsTo
    {
        return $this->belongsTo(DiscoCapacidad::class);
    }

    public function interfaz(): BelongsTo
    {
        return $this->belongsTo(DiscoInterfaz::class);
    }
}
