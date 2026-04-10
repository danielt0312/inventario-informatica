<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Custodia extends Model
{
    use HasFactory;

    protected $table = 'custodias';

    protected $fillable = [
        'articulo_id',
        'fecha_asignacion',
    ];

    public $timestamps = false;

    public function articulo(): BelongsTo {
        return $this->belongsTo(Articulo::class, 'articulo_id');
    }

    public function resguardos(): BelongsToMany {
        return $this->belongsToMany(Resguardo::class, 'resguardo_custodia', 'custodia_id', 'resguardo_id');
    }
}
