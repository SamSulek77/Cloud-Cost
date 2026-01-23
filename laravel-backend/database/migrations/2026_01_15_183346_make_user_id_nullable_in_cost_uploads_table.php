<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('cost_uploads', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('cost_uploads', function (Blueprint $table) {
            // Revert to not null (careful if data has nulls now)
            // We assume for rollback we'd make it required again, but strict rollback might fail if data exists.
            $table->unsignedBigInteger('user_id')->nullable(false)->change();
        });
    }
};
