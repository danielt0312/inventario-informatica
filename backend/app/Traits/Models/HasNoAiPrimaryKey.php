<?php

namespace App\Traits\Models;

trait HasNoAiPrimaryKey
{
    public function initializeHasNoAiPrimaryKey(): void
    {
        $this->incrementing = false;
        $this->keyType = 'int';
    }
}
