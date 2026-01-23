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
        Schema::table('cost_records', function (Blueprint $table) {
            $table->string('usage_type')->nullable()->after('product_name');
            $table->decimal('usage_quantity', 15, 4)->nullable()->after('usage_type');
            
            // Adding a simple index on usage_type for filtering
            $table->index('usage_type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('cost_records', function (Blueprint $table) {
            $table->dropIndex(['usage_type']);
            $table->dropColumn(['usage_type', 'usage_quantity']);
        });
    }
};
