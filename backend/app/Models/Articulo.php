<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

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
        'estado_id' => ArticuloEstado::ACTIVO_ID,
        'qr_archivo_id' => null,
    ];

    public function producto() {
        return $this->belongsTo(Producto::class, 'producto_id');
    }

    public function estado() {
        return $this->belongsTo(ArticuloEstado::class, 'estado_id');
    }

    public function factura() {
        return $this->belongsTo(Factura::class, 'articulo');
    }

    public function qr() {
        return $this->belongsTo(Archivo::class, 'qr_archivo_id');
    }
}
