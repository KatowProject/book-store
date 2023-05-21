<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{
    public function get_all_products(Request $request) {
        $products = Product::with('category')->get();
        $products->load('orderProducts');

        // get sold count
        foreach ($products as $product) {
            $product['sold_count'] = 0;

            foreach ($product->orderProducts as $orderProduct) {
                $product['sold_count'] += $orderProduct['quantity'];
            }

            // image
            $product['image'] = url('images/' . $product['image']);

            unset($product['orderProducts']);
        }

        return response()->json([
            'statusCode' => 200,
            'message' => 'Success',
            'data' => $products
        ], 200);
    }

    public function get_product(Request $request, $id) {
        $product = Product::with('category')->find($id);

        if (!$product) {
            return response()->json([
                'statusCode' => 404,
                'message' => 'Product not found'
            ], 404);
        }

        return response()->json([
            'statusCode' => 200,
            'message' => 'Success',
            'data' => $product
        ], 200);
    }

    public function create_product(Request $request) {
        $data = $request->all();

        $v = Validator::make($data, [
            'name' => 'required|string',
            'price' => 'required|integer',
            'stock' => 'required|integer',
            'image' => 'required|mimes:jpg,jpeg,png',
            'description' => 'required|string',
            'publisher' => 'required|string',
            'author' => 'required|string',
            'total_page' => 'required|integer',
            'status' => 'required|in:active,inactive',
            'category_id' => 'required|exists:categories,id'
        ]);

        if ($v->fails()) {
            return response()->json([
                'statusCode' => 400,
                'message' => $v->errors()
            ], 400);
        }

        $image = $request->file('image');
        $image_name = time() . '.' . $image->extension();
        $image->move(public_path('images'), $image_name);

        try {
            $product = Product::create([
                'name' => $data['name'],
                'price' => $data['price'],
                'stock' => $data['stock'],
                'image' => $image_name,
                'description' => $data['description'],
                'status' => $data['status'],
                'category_id' => $data['category_id'],
                'publisher' => $data['publisher'],
                'author' => $data['author'],
                'total_page' => $data['total_page']
            ]);

            return response()->json([
                'statusCode' => 200,
                'message' => 'Product created successfully',
                'data' => $product
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'statusCode' => 500,
                'message' => 'Internal server error'
            ], 500);
        }
    }

    public function update_product(Request $request, $id) {
        $data = $request->all();

        $v = Validator::make($data, [
            'name' => 'string',
            'price' => 'integer',
            'stock' => 'integer',
            'image' => 'mimes:jpg,jpeg,png',
            'description' => 'string',
            'status' => 'in:active,inactive',
            'category_id' => 'exists:categories,id'
        ]);

        if ($v->fails()) {
            return response()->json([
                'statusCode' => 400,
                'message' => $v->errors()
            ], 400);
        }

        $product = Product::find($id);
        if (!$product) {
            return response()->json([
                'statusCode' => 404,
                'message' => 'Product not found'
            ], 404);
        }

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $image_name = time() . '.' . $image->extension();
            $image->move(public_path('images'), $image_name);
            $data['image'] = $image_name;

            // Delete old image
            $old_image = $product->image;
            $image_path = public_path('images') . '/' . $old_image;
            if (file_exists($image_path)) {
                unlink($image_path);
            }
        }

        try {
            $product->update($data);

            return response()->json([
                'statusCode' => 200,
                'message' => 'Product updated successfully',
                'data' => $product
            ], 200);
        } catch (\Exception $e) {
            var_dump($e->getMessage());
            return response()->json([
                'statusCode' => 500,
                'message' => 'Internal server error'
            ], 500);
        }
    }

    public function delete_product(Request $request, $id) {
        $product = Product::find($id);
        if (!$product) {
            return response()->json([
                'statusCode' => 404,
                'message' => 'Product not found'
            ], 404);
        }

        try {
            $product->delete();

            // Delete image
            $old_image = $product->image;
            $image_path = public_path('images') . '/' . $old_image;
            if (file_exists($image_path)) {
                unlink($image_path);
            }

            return response()->json([
                'statusCode' => 200,
                'message' => 'Product deleted successfully'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'statusCode' => 500,
                'message' => 'Internal server error'
            ], 500);
        }
    }

    public function get_all_users(Request $request) {
        $users = User::all();

        return response()->json([
            'statusCode' => 200,
            'message' => 'Success',
            'data' => $users
        ], 200);
    }

    public function get_user(Request $request, $id) {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'statusCode' => 404,
                'message' => 'User not found'
            ], 404);
        }

        return response()->json([
            'statusCode' => 200,
            'message' => 'Success',
            'data' => $user
        ], 200);
    }

    public function create_user(Request $request) {
        $data = $request->all();

        $v = Validator::make($data, [
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string',
            'role' => 'required|in:admin,user'
        ]);

        if ($v->fails()) {
            return response()->json([
                'statusCode' => 400,
                'message' => $v->errors()
            ], 400);
        }

        try {
            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => $data['password'],
                'role' => $data['role']
            ]);

            return response()->json([
                'statusCode' => 200,
                'message' => 'User created successfully',
                'data' => $user
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'statusCode' => 500,
                'message' => 'Internal server error'
            ], 500);
        }
    }

    public function update_user(Request $request, $id) {
        $data = $request->all();

        $v = Validator::make($data, [
            'name' => 'string',
            'email' => 'email',
            'password' => 'string',
            'role' => 'in:admin,user'
        ]);

        if ($v->fails()) {
            return response()->json([
                'statusCode' => 400,
                'message' => $v->errors()
            ], 400);
        }

        $user = User::find($id);
        if (!$user) {
            return response()->json([
                'statusCode' => 404,
                'message' => 'User not found'
            ], 404);
        }

        try {
            $user->update($data);

            return response()->json([
                'statusCode' => 200,
                'message' => 'User updated successfully',
                'data' => $user
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'statusCode' => 500,
                'message' => 'Internal server error'
            ], 500);
        }
    }

    public function delete_user(Request $request, $id) {
        $user = User::find($id);
        if (!$user) {
            return response()->json([
                'statusCode' => 404,
                'message' => 'User not found'
            ], 404);
        }

        try {
            $user->delete();

            return response()->json([
                'statusCode' => 200,
                'message' => 'User deleted successfully'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'statusCode' => 500,
                'message' => 'Internal server error'
            ], 500);
        }
    }

    public function get_all_categories(Request $request) {
        // capitalize name
        $categories = Category::all();

        foreach ($categories as $category) {
            $category->name = ucwords($category->name);
        }

        return response()->json([
            'statusCode' => 200,
            'message' => 'Success',
            'data' => $categories
        ], 200);
    }

    public function get_category(Request $request, $id) {
        $category = Category::find($id);

        if (!$category) {
            return response()->json([
                'statusCode' => 404,
                'message' => 'Category not found'
            ], 404);
        }

        return response()->json([
            'statusCode' => 200,
            'message' => 'Success',
            'data' => $category
        ], 200);
    }

    public function create_category(Request $request) {
        $data = $request->all();

        $v = Validator::make($data, [
            'name' => 'required|string'
        ]);

        if ($v->fails()) {
            return response()->json([
                'statusCode' => 400,
                'message' => $v->errors()
            ], 400);
        }

        try {
            $category = Category::create([
                'name' => $data['name']
            ]);

            return response()->json([
                'statusCode' => 200,
                'message' => 'Category created successfully',
                'data' => $category
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'statusCode' => 500,
                'message' => 'Internal server error'
            ], 500);
        }
    }

    public function update_category(Request $request, $id) {
        $data = $request->all();

        $v = Validator::make($data, [
            'name' => 'string'
        ]);

        if ($v->fails()) {
            return response()->json([
                'statusCode' => 400,
                'message' => $v->errors()
            ], 400);
        }

        $category = Category::find($id);
        if (!$category) {
            return response()->json([
                'statusCode' => 404,
                'message' => 'Category not found'
            ], 404);
        }

        try {
            $category->update($data);

            return response()->json([
                'statusCode' => 200,
                'message' => 'Category updated successfully',
                'data' => $category
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'statusCode' => 500,
                'message' => 'Internal server error'
            ], 500);
        }
    }

    public function delete_category(Request $request, $id) {
        $category = Category::find($id);
        if (!$category) {
            return response()->json([
                'statusCode' => 404,
                'message' => 'Category not found'
            ], 404);
        }

        try {
            $category->delete();

            return response()->json([
                'statusCode' => 200,
                'message' => 'Category deleted successfully'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'statusCode' => 500,
                'message' => 'Internal server error'
            ], 500);
        }
    }

    public function get_all_orders(Request $request) {
        // sorting pending, processing, on delivery, delivered, cancelled
        $orders = Order::with('user', 'orderProducts')->orderBy(DB::raw("FIELD(status, 'pending', 'arrived', 'on delivery', 'processing', 'completed', 'declined')"))->get();

        // get product details
        foreach ($orders as $order) {
            foreach ($order->orderProducts as $orderProduct) {
                $orderProduct->product = Product::find($orderProduct->product_id);
                // image
                $orderProduct->product->image = url('images/' . $orderProduct->product->image);
            }
        }

        return response()->json([
            'statusCode' => 200,
            'message' => 'Success',
            'data' => $orders
        ], 200);
    }

    public function accept_order(Request $request, $id) {
        $order = Order::find($id);
        if (!$order) return response()->json(['statusCode' => 404, 'message' => 'Order not found'], 404);

        try {
            $order->update(['status' => 'processing']);

            return response()->json([
                'statusCode' => 200,
                'message' => 'Order accepted successfully',
                'data' => $order
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['statusCode' => 500, 'message' => 'Internal server error'], 500);
        }
    }

    public function decline_order(Request $request, $id) {
        $order = Order::find($id);
        if (!$order) return response()->json(['statusCode' => 404, 'message' => 'Order not found'], 404);

        try {
            $order->update(['status' => 'decline']);

            // return to stock
            foreach ($order->orderProducts as $orderProduct) {
                $product = Product::find($orderProduct->product_id);
                $product->update(['stock' => $product->stock + $orderProduct->quantity]);
            }

            return response()->json([
                'statusCode' => 200,
                'message' => 'Order declined successfully',
                'data' => $order
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['statusCode' => 500, 'message' => 'Internal server error'], 500);
        }
    }

    public function deliver_order(Request $request, $id) {
        $order = Order::find($id);
        if (!$order) return response()->json(['statusCode' => 404, 'message' => 'Order not found'], 404);

        try {
            $order->update(['status' => 'on delivery']);

            return response()->json([
                'statusCode' => 200,
                'message' => 'Order delivered successfully',
                'data' => $order
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['statusCode' => 500, 'message' => 'Internal server error'], 500);
        }
    }

    // produk telah sampai tujuan
    public function arrive_order(Request $request, $id) {
        $order = Order::find($id);
        if (!$order) return response()->json(['statusCode' => 404, 'message' => 'Order not found'], 404);

        try {
            $order->update(['status' => 'arrived']);

            return response()->json([
                'statusCode' => 200,
                'message' => 'Order completed successfully',
                'data' => $order
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['statusCode' => 500, 'message' => 'Internal server error'], 500);
        }
    }
}