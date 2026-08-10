<?php

namespace App\Traits\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Builder;

use App\Models\{
    Documento,
    Archivo
};

trait HasArchivable
{
    use \Znck\Eloquent\Traits\BelongsToThrough;

    public function initializeHasArchivable(): void
    {
        $this->fillable(array_merge($this->getFillable(), ['documento_id']));
    }

    public function documento(): BelongsTo
    {
        return $this->belongsTo(Documento::class);
    }

    public function archivo(): \Znck\Eloquent\Relations\BelongsToThrough
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
