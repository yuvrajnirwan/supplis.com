import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductsByCategorySlug } from '../services/productService';


const CATEGORY_META: Record<string, { title: string; description: string }> = {
    proteins: {
        title: 'Protein Powders & Isolates',
        description: 'Fuel muscle recovery with premium Whey Isolates, Concentrates, and Plant Proteins.',
    },
    creatine: {
        title: 'Creatine Monohydrate',
        description: 'Boost explosive lifting power, cellular hydration, and ATP regeneration.',
    },
    vitamins: {
        title: 'Daily Vitamins & Wellness',
        description: 'Multivitamins, Vitamin D3, Vitamin C, and essential micronutrient blends.',
    },
    'd3-k2': {
        title: 'Vitamin D3 + K2',
        description: 'Support bone health, immunity, and cardiovascular function with D3 and K2 synergy.',
    },
    multivitamins: {
        title: 'Daily Multivitamins & Minerals',
        description: 'Complete nutrient support for daily energy and immune function.',
    },
    'pre-workout': {
        title: 'Pre-Workout Energy & Focus',
        description: 'High-octane formulas with L-Citrulline, Beta-Alanine, and caffeine for maximum pump.',
    },
    hydration: {
        title: 'Hydration & Electrolyte Salts',
        description: 'Rehydrate faster with WHO-formula salts, effervescent tablets, and intra-workout EAAs.',
    },
    'omega-3': {
        title: 'Omega-3 Fish Oils',
        description: 'Daily EPA and DHA support for heart, brain, and joint health.',
    },
    'amino-acids': {
        title: 'BCAAs & EAAs',
        description: 'Promote recovery, endurance, and muscle protein synthesis with essential amino acids.',
    },
    'weight-management': {
        title: 'Fat Loss & Weight Management',
        description: 'Liquid L-Carnitine, CLA 1250, and thermogenic lipolytic capsules.',
    },
};

export const CategoryPage: React.FC = () => {
    const { categorySlug = 'proteins' } = useParams<{ categorySlug: string }>();
    const normalizedSlug = (categorySlug || 'proteins').trim().toLowerCase();
    const [products, setProducts] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLoading(true);
        getProductsByCategorySlug(normalizedSlug)
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [normalizedSlug]);

    const meta = CATEGORY_META[normalizedSlug] || {
        title: `${normalizedSlug.toUpperCase()} Catalog`,
        description: 'Explore our lab-tested authentic supplements.',
    };

    if (loading) {
        return (
            <div className="bg-light min-vh-100 d-flex align-items-center justify-content-center">
                <div className="spinner-border text-warning" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-light min-vh-100 py-4">
            <div className="container">
                {/* Category Header */}
                <div className="mb-4">
                    <h2 className="fw-bold text-dark">{meta.title}</h2>
                    <p className="text-muted small">{meta.description}</p>
                </div>

                {/* 4-Column Card Grid */}
                {products.length === 0 ? (
                    <div className="bg-white p-5 text-center rounded shadow-sm border">
                        <h5 className="fw-bold text-secondary">No products found in this category</h5>
                        <p className="text-muted small">Explore our other supplement categories.</p>
                    </div>
                ) : (
                    <div className="row g-4">
                        {products.map((product) => {
                            const primaryImage = product.imageUrl;

                            return (
                                <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                                    <div className="card h-100 border-0 shadow-sm overflow-hidden bg-white">

                                        {/* Product Image Area */}
                                        <div
                                            className="d-flex align-items-center justify-content-center p-3 bg-white"
                                            style={{ height: '220px' }}
                                        >
                                            <img
                                                src={primaryImage}
                                                alt={product.name}
                                                className="img-fluid"
                                                style={{ maxHeight: '100%', objectFit: 'contain' }}
                                                onError={(e) => {
                                                    e.currentTarget.src = 'https://via.placeholder.com/200x200?text=Product';
                                                }}
                                            />
                                        </div>

                                        {/* Product Details Area */}
                                        <div className="card-body p-3 d-flex flex-column justify-content-between border-top">
                                            <div>
                                                {/* Category Badge */}
                                                <span className="badge bg-light text-dark border fw-normal mb-2 px-2 py-1">
                                                    {product.category || normalizedSlug}
                                                </span>

                                                {/* Title */}
                                                <h6 className="card-title fw-bold text-dark mb-1 text-truncate" title={product.name}>
                                                    {product.name}
                                                </h6>
                                            </div>

                                            {/* Price & Action Button */}
                                            <div className="mt-3 d-flex align-items-center justify-content-between">
                                                <div>
                                                    {/* NEW LOGIC: Read priceInr directly from product */}
                                                    <span className="fw-bold fs-5 text-dark">
                                                        ₹{product.priceInr || '999'}
                                                    </span>
                                                </div>

                                                <Link
                                                    to={`/product/${product.id}`}
                                                    className="btn btn-warning btn-sm fw-bold px-3"
                                                >
                                                    View
                                                </Link>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryPage;