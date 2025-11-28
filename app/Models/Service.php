<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Str;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'short_description',
        'content',
        'icon',
        'features',
        'starting_price',
        'order',
        'is_featured'
    ];

    protected $casts = [
        'features' => 'array',
        'starting_price' => 'decimal:2',
        'is_featured' => 'boolean',
        'order' => 'integer',
    ];

    /**
     * Automatically generate slug when creating service
     */
    protected static function boot()
    {
        parent::boot();
        
        static::creating(function ($service) {
            if (empty($service->slug)) {
                $service->slug = Str::slug($service->title);
            }
        });
    }

    /**
     * Get the route key for the model.
     */
    public function getRouteKeyName()
    {
        return 'slug';
    }

    /**
     * Scope for featured services
     */
    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    /**
     * Scope for ordered services
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('order');
    }
}
