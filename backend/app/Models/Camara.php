<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Contracts\ProductoTipoDescriptivo;
use App\Enums\CamaraTipoEnum;

class Camara extends Model implements ProductoTipoDescriptivo
{
    protected $fillable = [
        'tipo_id',
    ];

    public $timestamps = false;

    public function tipo(): BelongsTo
    {
        return $this->belongsTo(CamaraTipo::class);
    }

    public function productoTipoDescripcion(): Attribute
    {
        return Attribute::get(
            fn () => CamaraTipoEnum::tryFrom($this->tipo_id)?->descripcion()
        );
    }
}
