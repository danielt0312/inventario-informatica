<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use App\Traits\Models\HasResourceResponse;

class Proveedor extends Model
{
    use HasResourceResponse;

    protected $fillable = [
        'rfc',
        'nombre',
    ];

    public function uniqueIds(): array
    {
        return ['rfc'];
    }
}
