import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../css/navbar.css";
import { useCart } from "../context/CartContext";

function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const { items } = useCart();

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen((prev) => !prev);
    };

    const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && searchQuery.trim()) {
            navigate(`/ProductListing?search=${encodeURIComponent(searchQuery.trim())}`);
            setIsMobileMenuOpen(false); // Close mobile menu if open
        }
    };
    return (
        <nav className="navbar">
            <div className="container-fluid">
                {/* Brand Logo */}
                <NavLink id="navLogo" className="navbar-brand" to="/">
                    Supplis.com
                </NavLink>

                {/* Mobile Hamburger Toggle Button */}
                <div
                    className={`hamburger ${isMobileMenuOpen ? "active" : ""}`}
                    onClick={toggleMobileMenu}
                    aria-label="Toggle navigation menu"
                >
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>

                {/* Navigation Links */}
                <ul className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}>
                    <li className="navlink">
                        <NavLink to="/" onClick={() => setIsMobileMenuOpen(false)}>
                            Home
                        </NavLink>
                    </li>

                    <li className="navlink">
                        <NavLink to="/categories" onClick={() => setIsMobileMenuOpen(false)}>
                            Categories
                        </NavLink>
                    </li>

                    <li className="navlink about">
                        <NavLink to="/about" onClick={() => setIsMobileMenuOpen(false)}>
                            About Us
                        </NavLink>
                    </li>

                    <li className="navlink">
                        <NavLink to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                            Contact Us
                        </NavLink>
                    </li>

                    <li className="navlink" id="user">
                        <NavLink to="/account" onClick={() => setIsMobileMenuOpen(false)}>
                            Account
                        </NavLink>
                    </li>


                    <li className="cart-mobile">
                        <NavLink to="/cart" className="cart-icon" onClick={() => setIsMobileMenuOpen(false)}>
                            🛒 Cart { /* mobile */ }
                        </NavLink>
                    </li>
                </ul>

                {/* Search Bar */}
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search supplements..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleSearchKeyDown}
                    />
                </div>

                {/* Desktop Cart */}
                <div className="cart-desktop">
                    <NavLink to="/cart" className="cart-icon">
                        🛒 Cart
                        {items && items.length > 0 ? <span className="ml-2 text-sm font-bold">({items.length})</span> : null}
                    </NavLink>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;