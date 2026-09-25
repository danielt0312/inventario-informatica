<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Disco extends Model
{
    protected $fillable = [
        'tipo_id',
        'capacidad_id',
        'interfaz_id',
        'factor_forma_id'
    ];

    protected $attributes = [
        'interfaz_id' => null,
        'factor_forma_id' => null
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

    public function factorForma(): BelongsTo
    {
        return $this->belongsTo(DiscoFactorForma::class);
    }

    public function descripcion(): Attribute
    {
        return Attribute::make(
            fn () => str_compact_join(
                $this->tipo->nombre,
                $this->capacidad->nombre,
                $this->interfaz?->nombre,
                $this->factorForma?->nombre,
            )
        );
    }
}
