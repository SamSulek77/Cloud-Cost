<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CostUpload extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'filename',
        'month_year',
        'total_cost',
        'total_records',
        'total_accounts',
        'uploaded_at',
    ];

    protected $casts = [
        'uploaded_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function records()
    {
        return $this->hasMany(CostRecord::class, 'upload_id');
    }
}