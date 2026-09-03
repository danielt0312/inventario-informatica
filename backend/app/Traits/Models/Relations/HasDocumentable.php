<?php

namespace App\Traits\Models\Relations;

use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\Builder;
use Staudenmeir\EloquentHasManyDeep\{
    HasRelationships,
    HasOneDeep
};
use App\Models\{
    Documento,
    Archivo
};

trait HasDocumentable
{
    use HasRelationships;

    public function documento(): MorphOne
    {
        return $this->morphOne(Documento::class, 'documentable');
    }

    public function archivo(): HasOneDeep
    {
        return $this->hasOneDeepFromRelations(
            $this->documento(),
            (new Documento)->archivo()
        );
    }
}
