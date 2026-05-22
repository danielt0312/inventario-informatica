<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Dictamen extends Model
{
    use SoftDeletes, HasFactory;

    protected $table = 'dictamenes';

    protected $fillable = [
        'estado_id',
        'oficio_id',
        'documento_id',
        'fecha_solicitud'
    ];

    protected $attributes = [
        'activo' => 1
    ];

    public function estado(): BelongsTo {
        return $this->belongsTo(DictamenEstado::class, 'estado_id');
    }

    public function oficio(): BelongsTo {
        return $this->belongsTo(Oficio::class, 'oficio_id');
    }

    public function documento(): BelongsTo {
        return $this->belongsTo(Documento::class, 'documento_id');
    }

    public function productos(): HasMany {
        return $this->hasMany(DictamenProducto::class, 'dictamen_id');
    }

    public function casts(): array {
        return [
            'activo' => 'boolean',
            'fecha_solicitud' => 'date'
        ];
    }
}
