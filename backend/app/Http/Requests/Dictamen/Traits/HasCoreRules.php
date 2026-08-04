<?php

trait CoreRules
{
    public function folioRules(): array
    {
        return ['required', 'string', 'max:64', 'unique:oficios,folio'];
    }

    public function fechaSolicitudRules(): array
    {
        return ['required', 'date', 'before_or_equal:today'];
    }
}
