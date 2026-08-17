import React, { useState } from 'react';

interface ProductDetailProps {
    product: any;
    onAddToCart: (productToAdd: any, quantity: number) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product, onAddToCart }) => {
    // NEW: Added state to manage quantity
    const [quantity, setQuantity] = useState(1);

    if (!product) return <div className="text-center py-5">Product not found</div>;

    const primaryVariant = product.variants?.[0] || {};
    const primaryImage = primaryVariant.images?.[0]?.url;

    // NEW: Prepare the exact data structure your CartContext expects
    const handleAddToCart = () => {
        const cartItemData = {
            id: product.id,
            name: product.name,
            priceInr: primaryVariant.priceInr,
            imageUrl: primaryImage,
        };
        onAddToCart(cartItemData, quantity);
    };

    const increaseQuantity = () => setQuantity(prev => prev + 1);
    const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

    return (
        <div className="container py-5">
            <div className="row">
                <div className="col-md-6 text-center">
                    <img
                        src={primaryImage || 'https://via.placeholder.com/500'}
                        alt={product.name}
                        className="img-fluid rounded shadow"
                        style={{ maxHeight: '500px', objectFit: 'contain' }}
                    />
                </div>
                <div className="col-md-6">
                    <h1 className="fw-bold mb-3">{product.name}</h1>
                    <div className="mb-4">
                        <span className="fs-2 fw-bold text-dark">₹{primaryVariant.priceInr}</span>
                        {primaryVariant.mrpInr > primaryVariant.priceInr && (
                            <span className="text-muted text-decoration-line-through ms-3 fs-5">₹{primaryVariant.mrpInr}</span>
                        )}
                    </div>
                    <p className="text-muted mb-4">{product.description || 'Premium quality supplement for your health and fitness goals.'}</p>

                    {/* NEW: Quantity Selector & Add to Cart Button */}
                    <div className="d-flex align-items-center gap-3 mb-4">
                        <div className="d-flex align-items-center border rounded">
                            <button
                                className="btn btn-light border-0 px-3 py-2 fw-bold"
                                onClick={decreaseQuantity}
                            >
                                -
                            </button>
                            <span className="px-4 fw-bold">{quantity}</span>
                            <button
                                className="btn btn-light border-0 px-3 py-2 fw-bold"
                                onClick={increaseQuantity}
                            >
                                +
                            </button>
                        </div>

                        <button
                            className="btn btn-warning btn-lg fw-bold flex-grow-1"
                            style={{ backgroundColor: '#ff9900', border: 'none' }}
                            onClick={handleAddToCart}
                        >
                            Add to Cart
                        </button>
                    </div>

                    {product.nutritionFacts && (
                        <div className="mt-5 p-4 border rounded bg-white shadow-sm">
                            <h5 className="fw-bold mb-3 border-bottom pb-2">Nutrition Facts</h5>
                            <div className="row g-2">
                                {Object.entries(product.nutritionFacts).map(([key, value]) => (
                                    <div key={key} className="col-6 d-flex justify-content-between border-bottom py-1">
                                        <span className="text-capitalize text-muted small">
                                            {key.replace(/([A-Z])/g, ' $1').trim()}
                                        </span>
                                        <span className="fw-semibold small">{String(value)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="mt-5">
                        <h5 className="fw-bold">Product Highlights</h5>
                        <ul className="text-muted">
                            <li>100% Authentic & Lab Tested</li>
                            <li>Premium Ingredients</li>
                            <li>Fast Delivery across India</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;