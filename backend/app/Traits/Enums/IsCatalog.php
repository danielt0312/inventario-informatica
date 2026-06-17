<?php

namespace App\Traits\Enums;

use App\Traits\HasLabel;

trait IsCatalog
{
    use HasLabel;

    public static function toFormattedArray(): array
    {
        return array_map(
            fn (self $case) => [
                'id' => $case->value,
                'nombre' => $case->getLabelValue()
            ],
            self::cases()
        );
    }

    public function getLabelValue(): string
    {
        try {
            return $this->label();
        } catch (\UnhandledMatchError) {
            return $this->getFormattedLabel();
        }
    }

    public function getFormattedLabel(): string
    {
        return ucwords(str_replace('_', ' ', strtolower($this->name)));
    }
}
