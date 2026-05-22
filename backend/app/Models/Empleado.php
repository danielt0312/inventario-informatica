<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Entidad espejo perteneciente a la entidad externa
 */
class Empleado extends Model
{
    protected $table = 'empleados';

    protected $fillable = [
        'externo_empleado_id',
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
        return ['externo_empleado_id'];
    }
}
