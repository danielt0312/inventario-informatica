<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Casts\Attribute;

use App\Support\FilePathGenerator;

class Archivo extends Model
{
    use HasUuids, HasFactory;

    protected $fillable = [
        'nombre',
        'extension'
    ];

    protected $attributes = [
        'activo' => 1
    ];

    public function documento(): HasOne
    {
        return $this->hasOne(Documento::class, 'archivo_id');
    }

    public function fileName(): Attribute
    {
        return Attribute::make(
            fn (mixed $value, array $attributes)
                => "{$attributes['uuid']}.{$attributes['extension']}"
        );
    }

    public function relativePath(): Attribute
    {
        return Attribute::make(
            fn (mixed $value, array $attributes)
                => FilePathGenerator::forUuid($attributes['uuid'], $attributes['extension'])
        );
    }

    public function casts(): array
    {
        return [
            'activo' => 'boolean',
        ];
    }

    public function uniqueIds(): array
    {
        return ['uuid'];
    }

    public function getRouteKeyName(): string
    {
        return 'uuid';
    }
}
