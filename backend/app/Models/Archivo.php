<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Casts\Attribute;

use App\Support\FilePathGenerator;

class Archivo extends Model
{
    use SoftDeletes, HasUuids, HasFactory;

    protected $table = 'archivos';

    protected $fillable = [
        'nombre',
        'tipo_id'
    ];

    protected $attributes = [
        'activo' => 1,
    ];

    public function tipo(): BelongsTo {
        return $this->belongsTo(ArchivoTipo::class, 'tipo_id');
    }

    public function fileName(): Attribute {
        return Attribute::make(
            fn (mixed $value, array $attributes)
                => sprintf('%s.%s', $this->uuid, $this->tipo->extension)
        );
    }

    public function relativePath(): Attribute {
        return Attribute::make(
            fn ()
                => FilePathGenerator::forUuid($this->uuid, $this->tipo->extension)
        );
    }

    public function casts(): array {
        return [
            'activo' => 'boolean',
        ];
    }

    public function uniqueIds(): array {
        return ['uuid'];
    }
}
