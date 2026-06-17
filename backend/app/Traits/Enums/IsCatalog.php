<?php

namespace App\Traits\Enums;

trait IsCatalog
{
    public function toFormattedArray(): array
    {
        return [
            'id' => $this->value,
            'nombre' => $this->getLabelValue()
        ];
    }

    public static function casesToFormattedArray(): array
    {
        return array_map(
            fn (self $case) => $case->toFormattedArray(),
            self::cases()
        );
    }

    public function getLabelValue(): string
    {
        if (!method_exists($this, 'label')) {
            return $this->getFormattedLabel();
        }

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
