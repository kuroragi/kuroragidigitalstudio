<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Str;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'category',
        'thumbnail',
        'gallery',
        'description',
        'client',
        'year',
        'status',
        'project_url',
        'github_url',
        'technologies',
        'created_by'
    ];

    protected $casts = [
        'gallery' => 'array',
        'technologies' => 'array',
        'year' => 'integer',
    ];

    /**
     * Automatically generate slug when creating project
     */
    protected static function boot()
    {
        parent::boot();
        
        static::creating(function ($project) {
            if (empty($project->slug)) {
                $project->slug = Str::slug($project->title);
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
     * Get the user who created this project
     */
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Scope for filtering by category
     */
    public function scopeByCategory($query, $category)
    {
        return $query->where('category', $category);
    }

    /**
     * Scope for published projects
     */
    public function scopePublished($query)
    {
        return $query->where('status', 'completed');
    }
}
