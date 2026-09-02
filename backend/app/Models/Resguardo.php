<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\{
    HasMany,
};

use App\Traits\Models\{
    HasArchivable,
    HasResourceResponse
};

class Resguardo extends Model
{
    use HasArchivable, HasResourceResponse;

    protected $fillable = [
        'empleado_id',
        'fecha_actualizacion',
        'fecha_cancelacion',
    ];

    public function articulosResguardados(): HasMany
    {
        return $this->hasMany(ResguardoArticulo::class);
    }
}
