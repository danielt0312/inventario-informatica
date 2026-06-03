<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Enums\DictamenEstadoEnum;

class DictamenEstado extends Model
{
    protected $table = 'dictamen_estados';

    public $timestamps = false;

    public function esDictaminar(): bool
    {
        return DictamenEstadoEnum::esDictaminar($this->id);
    }

    public function esEvidenciar(): bool
    {
        return DictamenEstadoEnum::esEvidenciar($this->id);
    }

    public function esSurtir(): bool
    {
        return DictamenEstadoEnum::esSurtir($this->id);
    }
}
