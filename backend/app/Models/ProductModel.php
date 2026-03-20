<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use App\Models\{Product, ProductBrand};

class ProductModel extends Model
{
    protected $fillable = [
        'product_id',
        'product_brand_id',
        'name'
    ];

    public function product() {
        return $this->hasOne(Product::Class);
    }

    public function brand() {
        return $this->hasOne(ProductBrand::Class);
    }
}
