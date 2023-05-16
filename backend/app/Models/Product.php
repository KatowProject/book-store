<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $table='products';
    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'name',
        'price',
        'stock',
        'image',
        'description',
        'status',
        'category_id'
    ];

    /**
     * Get the category that owns the product.
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
