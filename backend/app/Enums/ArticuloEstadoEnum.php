<?php

namespace App\Enums;

enum ArticuloEstadoEnum: int
{
    case ACTIVO             = 1;
    case BAJA               = 2;
    case BAJA_PREVENTIVA    = 3;
    case REVISION           = 4;
    case MANTENIMIENTO      = 5;

    public function nombre(): string {
        return match($this) {
            self::ACTIVO            => 'Activo',
            self::BAJA              => 'Baja definitiva',
            self::BAJA_PREVENTIVA   => 'Baja preventiva',
            self::REVISION          => 'Por verificar y configurar',
            self::MANTENIMIENTO     => 'Mantenimiento preventivo',
        };
    }
}
