<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Casts\Attribute;

use App\Enums\ArticuloEstadoEnum;
use App\Services\NumeroInventarioService;

class Articulo extends Model
{
    use HasFactory;

    protected $table = 'articulos';

    protected $fillable = [
        'producto_id',
        'estado_id',
        'numero_serie',
        'costo_unitario',
        'factura_id',
        'qr_archivo_id',
        'cuenta_contable',
        'dictamen_adquisicion_id',
        'es_contable',
        'es_resultado_esperado',
        'observaciones',
    ];

    protected $attributes = [
        'numero_serie' => null,
        'factura_id' => null,
        'numero_inventario' => null,
        'cuenta_contable' => null,
        'dictamen_adquisicion_id' => null,
        'es_resultado_esperado' => null,
        'observaciones' => null
    ];

    protected static function booted(): void
    {
        static::created(function (Articulo $articulo) {
            if (is_null($articulo->numero_inventario)) {
                // todo obtener el sufijo según el tipo de producto
                $articulo->numero_inventario = NumeroInventarioService::generate(500, $articulo->id);
                $articulo->saveQuietly();
            }
        });
    }

    public function dictamenAdquisicion(): BelongsTo
    {
        return $this->belongsTo(DictamenArticulo::class);
    }

    public function dictamen(): BelongsTo
    {
        return $this->belongsTo(Dictamen::class);
    }
    public function producto(): BelongsTo
    {
        return $this->belongsTo(Producto::class);
    }

    public function estado(): BelongsTo
    {
        return $this->belongsTo(ArticuloEstado::class);
    }

    public function factura(): BelongsTo
    {
        return $this->belongsTo(Factura::class);
    }

    public function qr(): BelongsTo {
        return $this->belongsTo(Archivo::class, 'qr_archivo_id');
    }

    public function casts(): array {
        return [
            'activo' => 'boolean',
            'es_contable' => 'boolean',
        ];
    }
}
