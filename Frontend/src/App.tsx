import React from "react";
import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";

// Components & Pages
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { HomePage } from "./components/HomePage";
import { CategoriesIndex } from "./components/CategoriesIndex";
import { CategoryPage } from "./components/CategoriesPage";
import ProductDetail from "./components/ProductDetail";
import { getAllProducts } from "./services/productService";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import {Features} from "./components/Features";
import {FAQs} from "./components/FAQs";



function ProductDetailWrapper() {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = React.useState<unknown>(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLoading(true);
        getAllProducts().then(all => {
            const found = all.find((p) => p.id === id);
            setProduct(found || all[0]);
            setLoading(false);
        });
    }, [id]);

    if (loading) return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center">
            <div className="spinner-border text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );

    return (
        <ProductDetail
            product={product}
            onAddToCart={(variant, quantity) => {
                console.log(`Added ${quantity} of ${variant.sku} to cart`);
            }}
        />
    );
}

export default function App() {
    return (
        <Router>
            <div className="d-flex flex-column min-vh-100 bg-light">
                <Navbar />

                {/* Main Content Area */}
                <main className="flex-grow-1">
                    <Routes>
                        {/* Homepage */}
                        <Route path="/" element={<HomePage />} />

                        {/* Backwards-compatible category path */}
                        <Route path="/shopcategory" element={<CategoryPage />} />

                        {/* Category index for user to choose a category */}
                        <Route path="/categories" element={<CategoriesIndex />} />

                        {/* Category Route */}
                        <Route path="/category/:categorySlug" element={<CategoryPage />} />

                        {/* Product Detail Route */}
                        <Route path="/product/:id" element={<ProductDetailWrapper />} />

                        {/* About Us Route */}
                        <Route path="/about" element={<AboutUs />} />

                        {/* Contact Us Route */}
                        <Route path="/contact" element={<ContactUs />} />


                        {/* Contact Us Route */}
                        <Route path="/features" element={<Features />} />

                        {/* FAQs Route */}
                        <Route path="/faqs" element={<FAQs />} />
                    </Routes>
                </main>

                <Footer />
            </div>
        </Router>
    );
}