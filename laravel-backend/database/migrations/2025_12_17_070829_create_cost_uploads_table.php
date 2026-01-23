<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('cost_uploads', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('filename');
            $table->string('month_year'); // e.g., "January 2025"
            $table->decimal('total_cost', 15, 2);
            $table->integer('total_records');
            $table->integer('total_accounts');
            $table->timestamp('uploaded_at');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('cost_uploads');
    }
};