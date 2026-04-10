<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

use App\ArticuloEstadoEnum;

class Articulo extends Model
{
    use SoftDeletes, HasFactory;

    protected $table = 'articulos';

    protected $fillable = [
        'producto_id',
        'estado_id',
        'numero_serie',
        'costo_unitario',
        'factura_id',
        'qr_archivo_id',
        'contable',
    ];

    protected $attributes = [
        'activo' => 1,
        'estado_id' => ArticuloEstadoEnum::ACTIVO->value,
        'qr_archivo_id' => null,
    ];

    public function producto(): BelongsTo {
        return $this->belongsTo(Producto::class, 'producto_id');
    }

    public function estado(): BelongsTo {
        return $this->belongsTo(ArticuloEstado::class, 'estado_id');
    }

    public function factura(): BelongsTo {
        return $this->belongsTo(Factura::class, 'factura_id');
    }

    public function qr(): BelongsTo {
        return $this->belongsTo(Archivo::class, 'qr_archivo_id');
    }

    public function casts(): array {
        return [
            'activo' => 'boolean',
            'contable' => 'boolean',
        ];
    }
}
