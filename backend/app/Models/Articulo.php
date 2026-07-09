<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\{BelongsTo, HasOne};
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Casts\Attribute;

use App\Enums\ArticuloEstadoEnum;

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
        'contable'
    ];

    protected $attributes = [
        'activo' => 1,
        'estado_id' => ArticuloEstadoEnum::REVISION->value,
        'numero_serie' => null,
        'costo_unitario' => null,
        'factura_id' => null,
        'contable' => null,
        'numero_inventario' => null
    ];

    protected static function booted(): void
    {
        static::created(function (Articulo $articulo) {
            if (is_null($articulo->numero_inventario)) {
                // todo generar dinamicamente
                $articulo->numero_inventario = '500-01-'.str_pad($articulo->id, 4, 0, STR_PAD_LEFT);
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
            'contable' => 'boolean',
        ];
    }
}
