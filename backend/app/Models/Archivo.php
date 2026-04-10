<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Archivo extends Model
{
    use SoftDeletes, HasUuids, HasFactory;

    protected string $table = 'archivos';

    protected array $fillable = [
        'nombre',
        'tipo_id'
    ];

    protected array $attributes = [
        'activo' => 1,
    ];

    public function tipo(): BelongsTo {
        return $this->belongsTo(ArchivoTipo::class, 'tipo_id');
    }

    public function casts(): array {
        return [
            'activo' => 'boolean',
        ];
    }
}
