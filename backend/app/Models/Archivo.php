<?php

namespace App\Models;

use App\Support\FilePathGenerator;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Archivo extends Model
{
    use HasUuids;

    protected $fillable = [
        'nombre',
        'extension',
        'size'
    ];

    public function documento(): HasOne
    {
        return $this->hasOne(Documento::class);
    }

    public function temporal(): HasOne
    {
        return $this->hasOne(ArchivoTemporal::class);
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

    public function uniqueIds(): array
    {
        return ['uuid'];
    }

    public function getRouteKeyName(): string
    {
        return 'uuid';
    }
}
