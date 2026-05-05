<?php

namespace App\Enums;

enum DocumentoTipoEnum: int
{
    case FACTURA        = 1;
    case OFICIO         = 2;
    case ADQUISICION    = 3;
    case RESGUARDO      = 4;
    case PRESTAMO       = 5;
    case DICTAMEN       = 6;

    public function nombre(): string {
        return match ($this) {
            self::FACTURA       => 'Factura',
            self::OFICIO        => 'Oficio solicitante',
            self::ADQUISICION   => 'Adquisición de Bienes Informáticos',
            self::RESGUARDO     => 'Resguardo de Bienes Informáticos',
            self::PRESTAMO      => 'Préstamo Temporal',
            self::DICTAMEN      => 'Dictámen Tecnológico',
        };
    }
}
