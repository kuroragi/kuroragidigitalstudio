<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\Cache;

class Setting extends Model
{
    use HasFactory;

    protected $fillable = [
        'key',
        'value',
        'type',
        'description',
        'group',
        'is_public'
    ];

    protected $casts = [
        'is_public' => 'boolean',
    ];

    /**
     * Get setting value by key
     */
    public static function get($key, $default = null)
    {
        $cacheKey = "setting.{$key}";
        
        return Cache::remember($cacheKey, 3600, function () use ($key, $default) {
            $setting = static::where('key', $key)->first();
            
            if (!$setting) {
                return $default;
            }
            
            return static::castValue($setting->value, $setting->type);
        });
    }

    /**
     * Set setting value
     */
    public static function set($key, $value, $type = 'string')
    {
        $setting = static::updateOrCreate(
            ['key' => $key],
            [
                'value' => $value,
                'type' => $type
            ]
        );
        
        // Clear cache
        Cache::forget("setting.{$key}");
        
        return $setting;
    }

    /**
     * Get all public settings for frontend
     */
    public static function getPublicSettings()
    {
        return Cache::remember('settings.public', 3600, function () {
            return static::where('is_public', true)
                        ->get()
                        ->mapWithKeys(function ($setting) {
                            return [
                                $setting->key => static::castValue($setting->value, $setting->type)
                            ];
                        });
        });
    }

    /**
     * Cast value to appropriate type
     */
    protected static function castValue($value, $type)
    {
        switch ($type) {
            case 'boolean':
                return filter_var($value, FILTER_VALIDATE_BOOLEAN);
            case 'json':
                return json_decode($value, true);
            case 'number':
                return is_numeric($value) ? (float) $value : $value;
            default:
                return $value;
        }
    }

    /**
     * Scope for public settings
     */
    public function scopePublic($query)
    {
        return $query->where('is_public', true);
    }

    /**
     * Scope by group
     */
    public function scopeByGroup($query, $group)
    {
        return $query->where('group', $group);
    }
}
