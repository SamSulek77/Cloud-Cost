<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CostRecord extends Model
{
    use HasFactory;

    protected $fillable = [
        'upload_id',
        'account_name',
        'usage_end_date',
        'product_code',
        'product_name',
        'month_year',
        'cost',
    ];

    protected $casts = [
        'usage_end_date' => 'date',
        'cost' => 'decimal:2',
    ];

    public function upload()
    {
        return $this->belongsTo(CostUpload::class, 'upload_id');
    }
}