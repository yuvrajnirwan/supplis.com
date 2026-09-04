import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export const CartPage: React.FC = () => {
    const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

    const getFullImageUrl = (imagePath: string) => {
        if (imagePath?.startsWith('http')) return imagePath;
        const baseUrl = import.meta.env.VITE_SUPABASE_URL;
        return `${baseUrl}${imagePath}`;
    };

    if (cartItems.length === 0) {
        return (
            <div className="bg-gray-50 min-h-screen py-16 flex flex-col items-center justify-center">
                <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 text-center max-w-md w-full">
                    <div className="text-[#ff9900] mb-4 flex justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Cart is Empty</h2>
                    <p className="text-gray-500 mb-8">Looks like you haven't added any supplements to your stack yet.</p>
                    <Link to="/categories" className="bg-[#ff9900] hover:bg-orange-500 text-black font-bold py-3 px-8 rounded-lg w-full inline-block transition-colors">
                        Start Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-10">
            <div className="max-w-7xl mx-auto px-4">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Cart Items */}
                    <div className="lg:w-2/3 space-y-4">
                        {cartItems.map((item) => (
                            <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-4">
                                <img
                                    src={getFullImageUrl(item.imageUrl)}
                                    alt={item.name}
                                    className="w-24 h-24 object-contain rounded-lg bg-gray-50"
                                />
                                <div className="flex-grow text-center sm:text-left">
                                    <h3 className="font-bold text-gray-900 text-lg">{item.name}</h3>
                                    <p className="text-[#ff9900] font-bold mt-1">₹{item.priceInr}</p>
                                </div>

                                {/* Quantity Controls */}
                                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className="px-3 py-1 bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold transition-colors"
                                    >-</button>
                                    <span className="px-4 py-1 font-medium text-gray-900">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="px-3 py-1 bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold transition-colors"
                                    >+</button>
                                </div>

                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-red-500 hover:text-red-700 p-2 ml-2 transition-colors"
                                    title="Remove item"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:w-1/3">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-4">Order Summary</h3>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span className="font-medium text-gray-900">₹{cartTotal}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span className="text-green-600 font-medium">Free</span>
                                </div>
                            </div>

                            <div className="border-t border-gray-100 pt-4 mb-6 flex justify-between items-center">
                                <span className="text-lg font-bold text-gray-900">Total</span>
                                <span className="text-2xl font-bold text-[#ff9900]">₹{cartTotal}</span>
                            </div>

                            <Link to="/checkout" className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 rounded-lg transition-colors text-center inline-block">
                                Proceed to Checkout
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;