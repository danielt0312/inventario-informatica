<?php

namespace App\Traits\Models;

use Illuminate\Http\JsonResponse;

trait HasResourceResponse
{
    public function toResourceResponse(int $status = 200): JsonResponse
    {
        if (! $this->exists) {
            throw new \LogicException(sprintf(
                'Cannot build a resource response for an unpersisted [%s] instance.',
                static::class
            ));
        }

        return $this->toResource()
            ->response()
            ->setStatusCode($status);
    }
}
