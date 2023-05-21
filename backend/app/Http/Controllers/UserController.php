<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Category;
use App\Models\Order;
use App\Models\OrderProduct;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function get_all_products(Request $request) {
        // sort by stock
        $products = Product::where('status', 'active')->orderBy('stock', 'desc')->get();

        foreach ($products as $product) {
            $category = Category::where('id', $product['category_id'])->first();
            $product['category'] = $category['name'];
        }

        return response()->json([
            'statusCode' => 200,
            'message' => 'Success!',
            'data' => $products
        ], 200);
    }

    public function get_all_products_by_category(Request $request) {
        // filter non active product
        $category = Category::with('products')->get();

        foreach ($category as $cat) {
            $cat['name'] = ucfirst($cat['name']);
            $cat['products'] = $cat->products->where('status', 'active');

            // image url
            foreach ($cat['products'] as $product) {
                $product['image'] = url('images/' . $product['image']);
            }
        }

        return response()->json([
            'statusCode' => 200,
            'message' => 'Success!',
            'data' => $category
        ], 200);
    }

    public function get_products_discovery(Request $request) {
        // get top 5 product from order_product with the most quantity and get count of order_product

        $products = Product::where('status', 'active')->orderBy('stock', 'desc')->get();
        $products->load('orderProducts');

        // get count of quantity
        foreach ($products as $product) {
            $product['sold_count'] = 0;

            foreach ($product->orderProducts as $orderProduct) {
                $product['sold_count'] += $orderProduct['quantity'];
            }
            $product['image'] = url('images/' . $product['image']);

            $category = Category::where('id', $product['category_id'])->first();
            $product['category'] = $category['name'];

            unset($product['orderProducts']);
        }

        $discovery = $products->take(5);
        $discovery = $products->values()->all();
        $discovery = collect($products)->sortByDesc('sold_count')->values()->all();

        return response()->json([
            'statusCode' => 200,
            'message' => 'Success!',
            'data' => [
                'products' => $products,
                'top_seller' => $discovery
            ]
        ], 200);
    }

    public function get_product(Request $request, $id) {
        $product = Product::where('id', $id)->where('status', 'active')->first();

        if (!$product) {
            return response()->json([
                'statusCode' => 404,
                'message' => 'Product not found!'
            ], 404);
        }

        return response()->json([
            'statusCode' => 200,
            'message' => 'Success!',
            'data' => $product
        ], 200);
    }

    public function get_me(Request $request) {
        $user = $request['userauth'];
        $user_id = $user['id'];

        $user = User::where('id', $user_id)->first();
        $orders = Order::where('user_id', $user_id)->get();
        $orders->load('orderProducts');

        $user['orders'] = $orders;

        return response()->json([
            'statusCode' => 200,
            'message' => 'Success!',
            'data' => $user
        ], 200);
    }

    public function update_me(Request $request) {
        $user = $request['userauth'];
        $user_id = $user['id'];

        $user = User::where('id', $user_id)->first();
        if (!$user) {
            return response()->json([
                'statusCode' => 404,
                'message' => 'User not found!'
            ], 404);
        }

        $v = Validator::make($request->all(), [
            'name' => 'string',
            'email' => 'string|email',
            'password' => 'string',
        ]);

        if ($v->fails()) {
            return response()->json([
                'statusCode' => 400,
                'message' => 'Bad request!'
            ], 400);
        }

        $user->name = $request['name'] ?? $user->name;
        $user->email = $request['email'] ?? $user->email;
        $user->password = $request['password'] ?? $user->password;

        $user->save();

        return response()->json([
            'statusCode' => 200,
            'message' => 'User updated successfully!',
            'data' => $user
        ], 200);
    }


    public function get_cart(Request $request) {
        $user = $request['userauth'];
        $user_id = $user['id'];

        $carts = User::find($user_id)->carts;
        $carts->load('product');

        return response()->json([
            'statusCode' => 200,
            'message' => 'Success!',
            'data' => $carts
        ], 200);
    }

    public function add_to_cart(Request $request) {
        $user = $request['userauth'];
        $user_id = $user['id'];

        $v = Validator::make($request->all(), [
            'product_id' => 'required|integer',
            'quantity' => 'required|integer',
        ]);

        if ($v->fails()) {
            return response()->json([
                'statusCode' => 400,
                'message' => 'Bad request!'
            ], 400);
        }

        $product_id = $request['product_id'];
        $quantity = $request['quantity'];

        $product = Product::where('id', $product_id)->where('status', 'active')->first();
        if (!$product) {
            return response()->json([
                'statusCode' => 404,
                'message' => 'Product not found!'
            ], 404);
        }

        $cart = Cart::where('user_id', $user_id)->where('product_id', $product_id)->first();
        if ($cart) {
            // check if quantity is available
            if ($cart->quantity + $quantity > $product->stock) {
                return response()->json([
                    'statusCode' => 400,
                    'message' => 'Quantity not available!'
                ], 400);
            }

            if ($cart->quantity + $quantity == 0) {
                $cart->delete();

                return response()->json([
                    'statusCode' => 200,
                    'message' => 'Product removed from cart successfully!'
                ], 200);
            }

            $cart->quantity += $quantity;
            $cart->save();
        } else {
            // check if quantity is available
            if ($quantity > $product->stock) {
                return response()->json([
                    'statusCode' => 400,
                    'message' => 'Quantity not available!'
                ], 400);
            }

            $cart = Cart::create([
                'user_id' => $user_id,
                'product_id' => $product_id,
                'quantity' => $quantity
            ]);
        }

        return response()->json([
            'statusCode' => 200,
            'message' => 'Product added to cart successfully!',
            'data' => $cart
        ], 200);
    }

    public function remove_from_cart(Request $request, $id) {
        $user = $request['userauth'];
        $user_id = $user['id'];

        $cart = Cart::where('id', $id)->where('user_id', $user_id)->first();
        if (!$cart) {
            return response()->json([
                'statusCode' => 404,
                'message' => 'Cart not found!'
            ], 404);
        }

        $cart->delete();

        return response()->json([
            'statusCode' => 200,
            'message' => 'Cart removed successfully!'
        ], 200);
    }

    public function place_order(Request $request) {
        $user = $request['userauth'];
        $user_id = $user['id'];

        $data = $request->all();
        $v = Validator::make($data, [
            'name' => 'required|string',
            'address' => 'required|string',
            'phone_number' => 'required|string',
            'post_code' => 'required|string',
            'payment_method' => 'required|string|in:cash,transfer',
        ]);

        if ($v->fails()) {
            return response()->json([
                'statusCode' => 400,
                'message' => 'Bad Request',
            ], 400);
        }

        $order = new Order();
        $order->fill($data);

        // get total price
        $carts = User::find($user_id)->carts;
        $carts->load('product');

        $total_price = 0;
        foreach ($carts as $cart) $total_price += $cart->quantity * $cart->product->price;

        $order->total = $total_price;
        $order->user_id = $user_id;

        $order->save();

        // create order products
        foreach ($carts as $cart) {
            $orderProduct = new OrderProduct();
            $orderProduct->order_id = $order->id;
            $orderProduct->product_id = $cart->product_id;
            $orderProduct->quantity = $cart->quantity;
            $orderProduct->save();

            // update product stock
            $product = Product::find($cart->product_id);
            $product->stock -= $cart->quantity;
            $product->save();

            // delete cart
            $cart->delete();
        }

        return response()->json([
            'statusCode' => 200,
            'message' => 'Order placed successfully!',
            'data' => $order
        ], 200);
    }

    public function get_all_orders(Request $request) {
        $user = $request['userauth'];
        $user_id = $user['id'];

        $orders = Order::where('user_id', $user_id)->get();
        $orders->load('orderProducts');

        // get product details
        foreach ($orders as $order) {
            foreach ($order->orderProducts as $orderProduct) {
                $orderProduct->product = Product::find($orderProduct->product_id);
            }
        }

        return response()->json([
            'statusCode' => 200,
            'message' => 'Success!',
            'data' => $orders
        ], 200);
    }

    public function complete_order(Request $request, $id) {
        $user = $request['userauth'];
        $user_id = $user['id'];

        $order = Order::where('id', $id)->where('user_id', $user_id)->first();
        if (!$order) {
            return response()->json([
                'statusCode' => 404,
                'message' => 'Order not found!'
            ], 404);
        }

        $order->status = 'completed';
        $order->save();

        return response()->json([
            'statusCode' => 200,
            'message' => 'Order completed successfully!'
        ], 200);
    }
}