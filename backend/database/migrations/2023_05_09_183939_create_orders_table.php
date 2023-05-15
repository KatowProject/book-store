<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table ->string("address");
            $table ->string("phone_number");
            $table ->string("post_code");
            $table ->string("total");
            $table ->string("payment_method");
            $table ->string("order_id");
            $table ->enum("status", ["pending", "processing", "completed", "decline", "on delivery"])->default("pending");
            $table ->bigInteger("user_id")->unsigned();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
}