<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class EntityNotEditableException extends Exception
{
    public function __construct(
        public readonly string $reason = 'entity_not_editable',
        string $message = 'Esta entidad no puede ser modificada en su estado actual.'
    ) {
        parent::__construct($message);
    }

    public function render(Request $request)
    {
        return response()->json([
            'message' => $this->getMessage(),
            'error' => $this->reason,
        ], 409);
    }
}
