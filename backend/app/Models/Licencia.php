<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\Models\Relations\{
    HasDictamen,
    HasProducto
};

class Licencia extends Model
{
    use HasDictamen, HasProducto;

    protected $fillable = [
        'dictamen_id',
        'producto_id',
        'fecha_expiracion',
    ];
}
