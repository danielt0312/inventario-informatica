<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Entidad espejo perteneciente a la entidad externa
 */
class Adscripcion extends Model
{
    protected $table = 'adscripciones';

    protected $fillable = [
        'externo_adscripcion_id',
        'verified_at'
    ];

    public $timestamps = false;

    public function casts(): array
    {
        return [
            'verified_at' => 'timestamp'
        ];
    }

    public function uniqueIds(): array
    {
        return ['externo_adscripcion_id'];
    }
}
