import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ProductDetail } from "./components/ProductDetails"; // Your PDP component
import { CategoryPage } from "./components/CategoriesPage";           // Category listing page
import { ALL_PRODUCTS } from "./utils/catalog";                // All unified products
import { CartProvider } from "./context/CartContext";
import CartPage from "./components/CartPage";
import CheckoutPage from "./components/CheckoutPage";
import CategoriesIndex from "./components/CategoriesIndex";
import HomePage from "./components/HomePage";

export default function App() {
    return (
        <CartProvider>
        <Router>
            <div className="flex flex-col min-h-screen bg-gray-50">
                <Navbar />

                {/* Main Content Area */}
                <main className="flex-1">
                    <Routes>
                        {/* Default Homepage -> beautiful landing with carousel */}
                        <Route path="/" element={<HomePage />} />

                        {/* Backwards-compatible path used by some links */}
                        <Route path="/ProductListing" element={<CategoryPage />} />

                        {/* Category index for user to choose a category */}
                        <Route path="/categories" element={<CategoriesIndex />} />

                        {/* Category Route */}
                        <Route path="/category/:categorySlug" element={<CategoryPage />} />

                        {/* Product Detail Route */}
                        <Route path="/product/:id" element={<ProductDetailWrapper />} />

                        {/* Cart / Checkout */}
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/checkout" element={<CheckoutPage />} />
                    </Routes>
                </main>

                <Footer />
            </div>
        </Router>
        </CartProvider>
    );
}

// Wrapper component to match the URL `:id` to a product from your dataset
import { useParams } from "react-router-dom";

function ProductDetailWrapper() {
    const { id } = useParams<{ id: string }>();

    // Find matching product from JSON catalog by ID
    const product = ALL_PRODUCTS.find((p) => p.id === id) || ALL_PRODUCTS[0];

    return (
        <ProductDetail
            product={product}
            onAddToCart={(variant, quantity) => {
                console.log(`Added ${quantity} of ${variant.sku} to cart`);
            }}
        />
    );
}