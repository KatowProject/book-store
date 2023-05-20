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
            $table->string("name");
            $table ->string("address");
            $table ->string("phone_number");
            $table ->string("post_code");
            $table ->bigInteger("total");
            $table ->string("payment_method");
            $table ->enum("status", ["pending", "processing", "completed", "decline", "on delivery"])->default("pending");
            $table ->bigInteger("user_id")->unsigned();
            $table ->foreign("user_id")->references("id")->on("users")->onDelete("cascade");
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