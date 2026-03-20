<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use App\Models\ProductType;

class Product extends Model
{
    protected $fillable = [
        'product_type_id',
        'name'
    ];

    public function type() {
        return $this->hasOne(ProductType::class);
    }

    public function model() {
        return $this->belongsTo(ProductModel::class);
    }
}

