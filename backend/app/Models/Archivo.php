<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\{BelongsTo, HasOne};
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Casts\Attribute;

use Illuminate\Http\UploadedFile;

use App\Support\FilePathGenerator;

use App\Enums\ArchivoTipoEnum;

class Archivo extends Model
{
    use SoftDeletes, HasUuids, HasFactory;

    protected $table = 'archivos';

    protected $fillable = [
        'nombre',
        'tipo_id',
        'extension'
    ];

    protected $attributes = [
        'nombre' => null,
        'activo' => 1
    ];

    public function documento(): HasOne
    {
        return $this->hasOne(Documento::class, 'archivo_id');
    }

    public function fileName(): Attribute
    {
        return Attribute::make(
            fn () => sprintf('%s.%s', $this->uuid, $this->extension)
        );
    }

    public function relativePath(): Attribute
    {
        return Attribute::make(
            fn () => FilePathGenerator::forUuid($this->uuid, $this->extension)
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
