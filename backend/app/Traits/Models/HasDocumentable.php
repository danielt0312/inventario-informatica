<?php

namespace App\Traits\Models;

use Znck\Eloquent\Traits\BelongsToThrough as BelongsToThroughTrait;
use Znck\Eloquent\Relations\BelongsToThrough;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\Builder;
use App\Models\{
    Documento,
    Archivo
};

trait HasDocumentable
{
    use BelongsToThroughTrait;

    public function documento(): MorphOne
    {
        return $this->morphOne(Documento::class, 'documentable');
    }

    public function archivo(): BelongsToThrough
    {
        return $this->belongsToThrough(Archivo::class, Documento::class);
    }

    public function scopeWhereArchivoUuid(Builder $query, string $uuid, ?string $tableName = null): Builder
    {
        $tableName ??= $this->getTable();

        return $query
            ->join('documentos', 'documentos.id', '=', "$tableName.documento_id")
            ->join('archivos', 'archivos.id', '=', 'documentos.archivo_id')
            ->where('archivos.uuid', $uuid);
    }

    public function scopeSelectOnlyOwnColumns(Builder $query): Builder
    {
        return $query->select($this->getTable().'.*');
    }

    public function scopeFindByArchivoUuid(Builder $query, string $uuid, ?string $tableName = null): Builder
    {
        return $query->whereArchivoUuid($uuid, $tableName)
            ->selectOnlyOwnColumns();
    }
}
