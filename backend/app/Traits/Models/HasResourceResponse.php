<?php

namespace App\Traits\Models;

use Illuminate\Http\JsonResponse;

trait HasResourceResponse
{
    public function toResourceResponse(int $status = 200, ?string $resourceClass = null): JsonResponse
    {
        return $this->toResource($resourceClass)
            ->response()
            ->setStatusCode($status);
    }
}
