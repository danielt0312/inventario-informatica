<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\{BelongsTo, HasOne};
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Casts\Attribute;

use App\Enums\ArticuloEstadoEnum;
use App\Services\NumeroInventarioService;

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
        'cuenta_contable',
        'es_contable'
    ];

    protected $attributes = [
        'activo' => 1,
        'estado_id' => ArticuloEstadoEnum::REVISION->value,
        'numero_serie' => null,
        'factura_id' => null,
        'numero_inventario' => null,
        'cuenta_contable' => null,
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

    public function dictamenArticulo(): HasOne
    {
        return $this->hasOne(DictamenArticulo::class);
    }

    public function dictamen(): HasOneThrough
    {
        return $this->hasOneThrough(
            Dictamen::class,
            DictamenArticulo::class,
            // 'articulo_id',
            // 'id',
            // 'id',
            // 'dictamen_id'
        );
    }

    public function recepcion(): HasOne
    {
        return $this->hasOne(ArticuloRecepcion::class);
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
