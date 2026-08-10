import React from 'react';
import { Link } from 'react-router-dom';

const SUPABASE_BASE_URL =
    process.env.VITE_SUPABASE_URL;

interface CategoryItem {
    slug: string;
    title: string;
    badgeText: string;
    image: string;
}

const CATEGORIES: CategoryItem[] = [
    {
        slug: 'proteins',
        title: 'Proteins & Whey Isolates',
        badgeText: 'Proteins',
        image: `${SUPABASE_BASE_URL}/storage/v1/object/public/Supplies/CategoryPage/protein.jpg`,
    },
    {
        slug: 'creatine',
        title: 'Micronized Creatine',
        badgeText: 'Creatine',
        image: `${SUPABASE_BASE_URL}/storage/v1/object/public/Supplies/CategoryPage/creatine.jpg`,
    },
    {
        slug: 'pre-workout',
        title: 'Pre-Workout & Energy',
        badgeText: 'Pre-Workout',
        image: `${SUPABASE_BASE_URL}/storage/v1/object/public/Supplies/CategoryPage/pre.jpg`,
    },
    {
        slug: 'multivitamins',
        title: 'Daily Multivitamins & Minerals',
        badgeText: 'Vitamins',
        image: `${SUPABASE_BASE_URL}/storage/v1/object/public/Supplies/CategoryPage/multivita.jpg`,
    },
    {
        slug: 'omega-3',
        title: 'Omega-3 Fish Oils',
        badgeText: 'Omega-3',
        image: `${SUPABASE_BASE_URL}/storage/v1/object/public/Supplies/CategoryPage/omega.jpg`,
    },
    {
        slug: 'd3-k2',
        title: 'Vitamin D3 + K2',
        badgeText: 'D3 + K2',
        image: `${SUPABASE_BASE_URL}/storage/v1/object/public/Supplies/CategoryPage/vita.webp`,
    },
    {
        slug: 'amino-acids',
        title: 'BCAAs & EAAs',
        badgeText: 'Amino Acids',
        image: `${SUPABASE_BASE_URL}/storage/v1/object/public/Supplies/CategoryPage/aminos.jpg`,
    },
    {
        slug: 'hydration',
        title: 'Hydration & Electrolytes',
        badgeText: 'Hydration',
        image: `${SUPABASE_BASE_URL}/storage/v1/object/public/Supplies/CategoryPage/salts.jpg`,
    },
    {
        slug: 'weight-management',
        title: 'Fat Loss & Weight Management',
        badgeText: 'Weight Management',
        image: `${SUPABASE_BASE_URL}/storage/v1/object/public/Supplies/CategoryPage/cla.jpg`,
    },
];

export const CategoriesIndex: React.FC = () => {
    return (
        <div className="bg-light min-vh-100 py-5">
            <div className="container">
                {/* Page Header */}
                <div className="mb-4">
                    <h2 className="fw-bold text-dark">Shop by Category</h2>
                    <p className="text-muted">Select a category to explore authentic supplements.</p>
                </div>

                <div className="row g-4">
                    {CATEGORIES.map((cat) => (
                        <div key={cat.slug} className="col-12 col-sm-6 col-md-4 col-lg-3">
                            <Link
                                to={`/category/${cat.slug}`}
                                className="text-decoration-none"
                            >
                                <div className="card h-100 border-0 shadow-sm overflow-hidden bg-white">

                                    {/* Centered Image Section */}
                                    <div
                                        className="d-flex align-items-center justify-content-center p-3 bg-white"
                                        style={{ height: '220px' }}
                                    >
                                        <img
                                            src={cat.image}
                                            alt={cat.title}
                                            className="img-fluid"
                                            style={{ maxHeight: '100%', objectFit: 'contain' }}
                                            onError={(e) => {
                                                e.currentTarget.src = 'https://via.placeholder.com/200x200?text=Category';
                                            }}
                                        />
                                    </div>

                                    {/* Bottom Content Area */}
                                    <div className="card-body p-3 d-flex flex-column justify-content-between border-top">
                                        <div>
                                            {/* Light Badge */}
                                            <span className="badge bg-light text-dark border fw-normal mb-2 px-2 py-1">
                                                {cat.badgeText}
                                            </span>

                                            {/* Category Name */}
                                            <h6 className="card-title fw-bold text-dark mb-0 text-truncate" title={cat.title}>
                                                {cat.title}
                                            </h6>
                                        </div>

                                        <div className="mt-3 text-end">
                                            <span className="text-warning fw-bold small">
                                                Explore →
                                            </span>
                                        </div>
                                    </div>

                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoriesIndex;