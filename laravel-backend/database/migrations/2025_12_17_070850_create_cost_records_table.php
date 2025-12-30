<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('cost_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('upload_id')->constrained('cost_uploads')->onDelete('cascade');
            $table->string('account_name');
            $table->date('usage_end_date');
            $table->string('month_year'); // e.g., "January 2025"
            $table->decimal('cost', 15, 2);
            $table->timestamps();
            
            // Indexes for faster queries
            $table->index('account_name');
            $table->index('month_year');
            $table->index(['account_name', 'month_year']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('cost_records');
    }
};