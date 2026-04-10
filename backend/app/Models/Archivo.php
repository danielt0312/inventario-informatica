<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Archivo extends Model
{
    use SoftDeletes, HasUuids;

    protected $table = 'archivos';

    protected $fillable = [
        'nombre',
        'tipo_id'
    ];

    protected $attributes = [
        'activo' => 1,
    ];

    public function tipo() {
        return $this->belongsTo(ArchivoTipo::class, 'tipo_id');
    }

    public function uniqueIds() {
        return ['uuid'];
    }
}
