<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Resguardo extends Model
{
    use SoftDeletes, HasFactory;

    protected $table = 'resguardos';

    protected $fillable = [
        'user_id',
        'fecha_solicitud',
        'fecha_cancelacion',
        'documento_id',
    ];

    protected $attributes = [
        'activo' => 1,
    ];

    public function user(): BelongsTo {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function documento(): BelongsTo {
        return $this->belongsTo(Documento::class, 'documento_id');
    }

    public function custodias(): BelongsToMany {
        return $this->belongsToMany(Custodia::class, 'resguardo_custodia', 'resguardo_id', 'custodia_id');
    }

    public function casts(): array {
        return [
            'activo' => 'boolean',
        ];
    }
}
