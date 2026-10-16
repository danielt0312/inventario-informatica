<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Procesador extends Model
{
    protected $fillable = [
        'nucleos',
        'hilos',
        'frecuencia_maxima_ghz'
    ];

    protected $attributes = [
        'nucleos' => null,
        'hilos' => null,
        'frecuencia_maxima_ghz' => null
    ];

    public $timestamps = false;

    public function descripcion(): Attribute
    {
        return Attribute::get(
            fn () => str_compact_join(
                $this->nucleos !== null ? "{$this->nucleos} nucleos" : null,
                $this->hilos !== null ? "{$this->hilos} nucleos" : null,
                $this->frecuencia_maxima_ghz !== null ? "{$this->frecuencia_maxima_ghz} GHz" : null,
            )
        );
    }
}
