import React from 'react';


interface ProductDetailProps {
    product: any;
    onAddToCart: (variant: any, quantity: number) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product, onAddToCart }) => {
    if (!product) return <div>Product not found</div>;

    const primaryVariant = product.variants?.[0] || {};
    const primaryImage = primaryVariant.images?.[0]?.url ;
    return (
        <div className="container py-5">
            <div className="row">
                <div className="col-md-6 text-center">
                    <img
                        src={primaryImage}
                        alt={product.name}
                        className="img-fluid rounded shadow"
                        style={{ maxHeight: '500px' }}
                    />
                </div>
                <div className="col-md-6">
                    <h1 className="fw-bold mb-3">{product.name}</h1>
                    <div className="mb-4">
                        <span className="fs-2 fw-bold text-dark">₹{primaryVariant.priceInr }</span>
                        {primaryVariant.mrpInr > primaryVariant.priceInr && (
                            <span className="text-muted text-decoration-line-through ms-3 fs-5">₹{primaryVariant.mrpInr}</span>
                        )}
                    </div>
                    <p className="text-muted mb-4">{product.description || 'Premium quality supplement for your health and fitness goals.'}</p>
                    
                    <div className="d-grid gap-2">
                        <button 
                            className="btn btn-warning btn-lg fw-bold"
                            onClick={() => onAddToCart(primaryVariant, 1)}
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
                            <li>Fast Delivery</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
