<?php

namespace App\Traits\Enums;

trait IsCatalog
{
    public function toFormattedCatalog(): array
    {
        return [
            'id' => $this->value,
            'nombre' => $this->getLabelValue()
        ];
    }

    public static function casesToFormattedCatalog(): array
    {
        return array_map(
            fn (self $case) => $case->toFormattedCatalog(),
            self::cases()
        );
    }

    public function getLabelValue(): string
    {
        if (!method_exists($this, 'formattedLabel')) {
            return $this->nameToFormattedLabel();
        }

        try {
            return $this->formattedLabel();
        } catch (\UnhandledMatchError) {
            return $this->nameToFormattedLabel();
        }
    }

    public function nameToFormattedLabel(): string
    {
        return ucwords(str_replace('_', ' ', strtolower($this->name)));
    }
}
