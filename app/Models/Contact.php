<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Contact extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'organization',
        'phone',
        'service',
        'subject',
        'message',
        'budget',
        'timeline',
        'status',
        'metadata'
    ];

    protected $casts = [
        'metadata' => 'array',
        'read_at' => 'datetime',
        'replied_at' => 'datetime'
    ];

    /**
     * Scope for unread contacts
     */
    public function scopeUnread($query)
    {
        return $query->whereNull('read_at');
    }

    /**
     * Scope for new contacts
     */
    public function scopeNew($query)
    {
        return $query->where('status', 'new');
    }

    /**
     * Scope for specific service
     */
    public function scopeByService($query, $service)
    {
        return $query->where('service', $service);
    }

    /**
     * Mark contact as read
     */
    public function markAsRead()
    {
        $this->update([
            'status' => 'read',
            'read_at' => now()
        ]);
    }

    /**
     * Mark contact as replied
     */
    public function markAsReplied()
    {
        $this->update([
            'status' => 'replied',
            'replied_at' => now()
        ]);
    }

    /**
     * Get formatted contact date
     */
    public function getFormattedDateAttribute()
    {
        return $this->created_at->format('F j, Y g:i A');
    }
}
