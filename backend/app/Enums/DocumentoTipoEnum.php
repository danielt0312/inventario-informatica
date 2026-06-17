<?php

namespace App\Enums;

use App\Traits\Enums\IsCatalog;

enum DocumentoTipoEnum: int
{
    use IsCatalog;

    case FACTURA = 1;
    case OFICIO = 2;
    case ADQUISICION = 3;
    case RESGUARDO = 4;
    case PRESTAMO = 5;
    case DICTAMEN = 6;

    public function label(): string {
        return match ($this) {
            self::FACTURA       => 'Factura',
            self::OFICIO        => 'Oficio solicitante',
            self::ADQUISICION   => 'Adquisición de Bienes Informáticos',
            self::RESGUARDO     => 'Resguardo de Bienes Informáticos',
            self::PRESTAMO      => 'Préstamo Temporal',
            self::DICTAMEN      => 'Dictamen de Tecnologías',
        };
    }
}
