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
        'message',
        'attachment',
        'read_flag',
        'priority',
        'status',
        'admin_notes',
        'responded_at'
    ];

    protected $casts = [
        'read_flag' => 'boolean',
        'responded_at' => 'datetime',
    ];

    /**
     * Scope for unread contacts
     */
    public function scopeUnread($query)
    {
        return $query->where('read_flag', false);
    }

    /**
     * Scope for new contacts
     */
    public function scopeNew($query)
    {
        return $query->where('status', 'new');
    }

    /**
     * Scope for high priority contacts
     */
    public function scopeHighPriority($query)
    {
        return $query->where('priority', 'high');
    }

    /**
     * Mark contact as read
     */
    public function markAsRead()
    {
        $this->update(['read_flag' => true]);
    }

    /**
     * Mark contact as responded
     */
    public function markAsResponded()
    {
        $this->update([
            'status' => 'responded',
            'responded_at' => now()
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
