<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Str;
use Carbon\Carbon;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'excerpt',
        'content',
        'cover_image',
        'tags',
        'status',
        'published_at',
        'read_time',
        'views',
        'author_id'
    ];

    protected $casts = [
        'tags' => 'array',
        'published_at' => 'datetime',
        'views' => 'integer',
        'read_time' => 'integer',
    ];

    /**
     * Automatically generate slug when creating post
     */
    protected static function boot()
    {
        parent::boot();
        
        static::creating(function ($post) {
            if (empty($post->slug)) {
                $post->slug = Str::slug($post->title);
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
     * Get the author of this post
     */
    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    /**
     * Scope for published posts
     */
    public function scopePublished($query)
    {
        return $query->where('status', 'published')
                    ->whereNotNull('published_at')
                    ->where('published_at', '<=', now());
    }

    /**
     * Scope for recent posts
     */
    public function scopeRecent($query, $limit = 5)
    {
        return $query->published()->latest('published_at')->limit($limit);
    }

    /**
     * Get formatted published date
     */
    public function getFormattedPublishedDateAttribute()
    {
        return $this->published_at ? $this->published_at->format('F j, Y') : null;
    }

    /**
     * Increment view count
     */
    public function incrementViews()
    {
        $this->increment('views');
    }
}
