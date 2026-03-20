<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use App\Models\ProductModel;

class ProductBrand extends Model
{
    protected $fillable = [
        'name'
    ];

    public function models() {
        $this->hasMany(ProductModel::class);
    }
}
