import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export const CheckoutPage: React.FC = () => {
    const { cartItems, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        pinCode: '',
    });

    const [paymentMethod, setPaymentMethod] = useState('upi');

    // Calculate Shipping (Free over ₹2000, otherwise ₹99)
    const shippingFee = cartTotal > 2000 || cartTotal === 0 ? 0 : 99;
    const finalTotal = cartTotal + shippingFee;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePlaceOrder = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate API call to process payment/order
        setTimeout(() => {
            setIsProcessing(false);
            alert(`Order placed successfully! Order ID: #ORD-${Math.floor(Math.random() * 1000000)}`);
            clearCart();
            navigate('/'); // Redirect to home or an order success page
        }, 2000);
    };

    // If cart is empty, don't allow checkout
    if (cartItems.length === 0) {
        return (
            <div className="container py-5 min-vh-100 d-flex flex-column align-items-center justify-content-center text-center">
                <div className="bg-white p-5 rounded-4 shadow-sm border" style={{ maxWidth: '500px' }}>
                    <h2 className="fw-bold mb-3">Your cart is empty</h2>
                    <p className="text-muted mb-4">You need to add some supplements to your stack before checking out.</p>
                    <Link to="/categories" className="btn btn-warning btn-lg fw-bold w-100">
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-light min-vh-100 py-5">
            <div className="container">
                <h2 className="fw-bold mb-4">Secure Checkout</h2>

                <form onSubmit={handlePlaceOrder}>
                    <div className="row g-4">
                        {/* LEFT COLUMN: Shipping & Payment Details */}
                        <div className="col-lg-8">
                            {/* Shipping Details Card */}
                            <div className="card border-0 shadow-sm rounded-4 mb-4">
                                <div className="card-body p-4">
                                    <h5 className="fw-bold mb-4 border-bottom pb-2">1. Shipping Details</h5>

                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <label className="form-label fw-semibold">First Name</label>
                                            <input required type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="form-control bg-light" placeholder="John" />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label fw-semibold">Last Name</label>
                                            <input required type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="form-control bg-light" placeholder="Doe" />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label fw-semibold">Email Address</label>
                                            <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="form-control bg-light" placeholder="john@example.com" />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label fw-semibold">Phone Number</label>
                                            <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="form-control bg-light" placeholder="+91" />
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label fw-semibold">Full Address</label>
                                            <input required type="text" name="address" value={formData.address} onChange={handleInputChange} className="form-control bg-light" placeholder="House/Flat No, Street, Landmark" />
                                        </div>
                                        <div className="col-md-5">
                                            <label className="form-label fw-semibold">City</label>
                                            <input required type="text" name="city" value={formData.city} onChange={handleInputChange} className="form-control bg-light" placeholder="New Delhi" />
                                        </div>
                                        <div className="col-md-4">
                                            <label className="form-label fw-semibold">State</label>
                                            <select required name="state" value={formData.state} onChange={handleInputChange} className="form-select bg-light">
                                                <option value="">Choose...</option>
                                                <option value="Delhi">Delhi</option>
                                                <option value="Maharashtra">Maharashtra</option>
                                                <option value="Karnataka">Karnataka</option>
                                                <option value="Haryana">Haryana</option>
                                                <option value="Punjab">Punjab</option>
                                                {/* Add more states as needed */}
                                            </select>
                                        </div>
                                        <div className="col-md-3">
                                            <label className="form-label fw-semibold">PIN Code</label>
                                            <input required type="text" name="pinCode" value={formData.pinCode} onChange={handleInputChange} className="form-control bg-light" placeholder="110001" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Method Card */}
                            <div className="card border-0 shadow-sm rounded-4">
                                <div className="card-body p-4">
                                    <h5 className="fw-bold mb-4 border-bottom pb-2">2. Payment Method</h5>

                                    <div className="d-flex flex-column gap-3">
                                        <label className={`border rounded p-3 cursor-pointer d-flex align-items-center ${paymentMethod === 'upi' ? 'border-warning bg-warning bg-opacity-10' : ''}`}>
                                            <input type="radio" name="payment" value="upi" checked={paymentMethod === 'upi'} onChange={(e) => setPaymentMethod(e.target.value)} className="form-check-input m-0 me-3" />
                                            <div>
                                                <span className="fw-bold d-block">UPI (GPay, PhonePe, Paytm)</span>
                                                <small className="text-muted">Instant, secure payment via UPI app</small>
                                            </div>
                                        </label>

                                        <label className={`border rounded p-3 cursor-pointer d-flex align-items-center ${paymentMethod === 'card' ? 'border-warning bg-warning bg-opacity-10' : ''}`}>
                                            <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={(e) => setPaymentMethod(e.target.value)} className="form-check-input m-0 me-3" />
                                            <div>
                                                <span className="fw-bold d-block">Credit / Debit Card</span>
                                                <small className="text-muted">Visa, MasterCard, RuPay</small>
                                            </div>
                                        </label>

                                        <label className={`border rounded p-3 cursor-pointer d-flex align-items-center ${paymentMethod === 'cod' ? 'border-warning bg-warning bg-opacity-10' : ''}`}>
                                            <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={(e) => setPaymentMethod(e.target.value)} className="form-check-input m-0 me-3" />
                                            <div>
                                                <span className="fw-bold d-block">Cash on Delivery (COD)</span>
                                                <small className="text-muted">Pay at your doorstep (₹50 extra fee may apply)</small>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Order Summary */}
                        <div className="col-lg-4">
                            <div className="card border-0 shadow-sm rounded-4 sticky-top" style={{ top: '80px' }}>
                                <div className="card-body p-4">
                                    <h5 className="fw-bold mb-4 border-bottom pb-2">Order Summary</h5>

                                    <div className="d-flex flex-column gap-3 mb-4 max-h-50 overflow-auto">
                                        {cartItems.map((item) => (
                                            <div key={item.id} className="d-flex align-items-center gap-3">
                                                <img src={item.imageUrl} alt={item.name} className="rounded border bg-light" style={{ width: '50px', height: '50px', objectFit: 'contain' }} />
                                                <div className="flex-grow-1">
                                                    <h6 className="mb-0 fw-semibold text-truncate" style={{ maxWidth: '150px' }} title={item.name}>{item.name}</h6>
                                                    <small className="text-muted">Qty: {item.quantity}</small>
                                                </div>
                                                <span className="fw-bold">₹{item.priceInr * item.quantity}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <ul className="list-group list-group-flush mb-4 border-top pt-3">
                                        <li className="list-group-item d-flex justify-content-between align-items-center px-0 border-0 text-muted">
                                            Subtotal
                                            <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center px-0 border-0 text-muted">
                                            Shipping
                                            {shippingFee === 0 ? (
                                                <span className="text-success fw-bold">FREE</span>
                                            ) : (
                                                <span>₹{shippingFee}</span>
                                            )}
                                        </li>
                                        {shippingFee > 0 && (
                                            <li className="list-group-item px-0 border-0 pt-0 pb-2">
                                                <small className="text-success">Add ₹{(2001 - cartTotal).toLocaleString('en-IN')} more for free shipping!</small>
                                            </li>
                                        )}
                                        <li className="list-group-item d-flex justify-content-between align-items-center px-0 border-top mt-2 pt-3">
                                            <span className="fw-bold fs-5">Total</span>
                                            <span className="fw-bold fs-4 text-warning" style={{ color: '#ff9900' }}>₹{finalTotal.toLocaleString('en-IN')}</span>
                                        </li>
                                    </ul>

                                    <button
                                        type="submit"
                                        disabled={isProcessing}
                                        className="btn btn-warning btn-lg w-100 fw-bold d-flex justify-content-center align-items-center gap-2"
                                    >
                                        {isProcessing ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                Place Order (₹{finalTotal.toLocaleString('en-IN')})
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                                                    <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                                                </svg>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CheckoutPage;