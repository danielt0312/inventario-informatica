<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\{BelongsTo, HasMany};
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
        'tipo_id'
    ];

    protected $attributes = [
        'activo' => 1
    ];

    public function tipo(): BelongsTo {
        return $this->belongsTo(ArchivoTipo::class, 'tipo_id');
    }

    public function documentos(): HasMany
    {
        return $this->hasMany(Documento::class, 'archivo_id');
    }

    public function fileName(): Attribute {
        return Attribute::make(
            fn (mixed $value, array $attributes)
                => sprintf('%s.%s', $this->uuid, $this->tipo->extension)
        );
    }

    public function relativePath(): Attribute {
        return Attribute::make(
            fn () => FilePathGenerator::forUuid($this->uuid, $this->tipo->extension)
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

    public static function createAndStore(
        UploadedFile $file,
        ArchivoTipoEnum $tipo = ArchivoTipoEnum::PDF
    ) {
        $filename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);

        $archivo = self::create([
            'nombre' => $filename,
            'tipo_id' => $tipo->value
        ]);

        $file->storeAs(
            dirname($archivo->relative_path),
            basename($archivo->relative_path)
        );

        return $archivo;
    }
}
