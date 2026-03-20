<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use App\Models\Product;

class ProductType extends Model
{
    protected $fillable = [
        'name'
    ];

    public function products() {
        return $this->hasMany(Product::class);
    }
}
