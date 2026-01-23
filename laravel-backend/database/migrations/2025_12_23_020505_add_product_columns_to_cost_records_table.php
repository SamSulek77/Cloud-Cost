<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('cost_records', function (Blueprint $table) {
            $table->string('product_code')->nullable()->after('account_name');
            $table->string('product_name')->nullable()->after('product_code');
            
            // Add indexes for faster queries
            $table->index('product_code');
            $table->index(['account_name', 'product_code', 'month_year']);
        });
    }

    public function down()
    {
        Schema::table('cost_records', function (Blueprint $table) {
            $table->dropIndex(['cost_records_product_code_index']);
            $table->dropIndex(['cost_records_account_name_product_code_month_year_index']);
            $table->dropColumn(['product_code', 'product_name']);
        });
    }
};