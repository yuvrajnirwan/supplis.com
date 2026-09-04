import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Account: React.FC = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated, loading, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('dashboard');

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            navigate('/login', { replace: true, state: { from: { pathname: '/account' } } });
        }
    }, [loading, isAuthenticated, navigate]);

    const handleLogout = () => {
        logout();
        navigate('/login', { replace: true });
    };

    // Dummy orders data (can be replaced with a fetch call to your orders endpoint)
    const orders = [
        { id: "SP-10923", date: "Aug 10, 2026", total: "₹4,599", status: "Delivered", item: "Whey Protein Isolate - 2kg" },
        { id: "SP-10899", date: "Jul 25, 2026", total: "₹999", status: "Delivered", item: "Micronized Creatine - 250g" },
        { id: "SP-11004", date: "Aug 12, 2026", total: "₹1,899", status: "Processing", item: "Pre-Workout Energy - 30 Servings" }
    ];

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <p className="text-gray-500 font-medium">Loading Account Details...</p>
            </div>
        );
    }

    if (!isAuthenticated || !user) {
        return null;
    }

    return (
        <div className="bg-gray-50 min-h-screen pb-16 pt-8">
            <div className="max-w-7xl mx-auto px-4">

                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
                    <p className="text-gray-500 mt-1">Welcome back, {user.name}!</p>
                </div>

                <div className="flex flex-col md:flex-row gap-8">

                    {/* Sidebar Navigation */}
                    <div className="w-full md:w-1/4">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <ul className="flex flex-col">
                                <li>
                                    <button
                                        onClick={() => setActiveTab('dashboard')}
                                        className={`w-full text-left px-6 py-4 font-medium transition-colors border-l-4 ${activeTab === 'dashboard' ? 'border-[#ff9900] bg-orange-50/50 text-[#ff9900]' : 'border-transparent text-gray-600 hover:bg-gray-50'}`}
                                    >
                                        Dashboard
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => setActiveTab('orders')}
                                        className={`w-full text-left px-6 py-4 font-medium transition-colors border-l-4 border-t border-t-gray-50 ${activeTab === 'orders' ? 'border-l-[#ff9900] bg-orange-50/50 text-[#ff9900]' : 'border-l-transparent text-gray-600 hover:bg-gray-50'}`}
                                    >
                                        Order History
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => setActiveTab('addresses')}
                                        className={`w-full text-left px-6 py-4 font-medium transition-colors border-l-4 border-t border-t-gray-50 ${activeTab === 'addresses' ? 'border-l-[#ff9900] bg-orange-50/50 text-[#ff9900]' : 'border-l-transparent text-gray-600 hover:bg-gray-50'}`}
                                    >
                                        Saved Addresses
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => setActiveTab('settings')}
                                        className={`w-full text-left px-6 py-4 font-medium transition-colors border-l-4 border-t border-t-gray-50 ${activeTab === 'settings' ? 'border-l-[#ff9900] bg-orange-50/50 text-[#ff9900]' : 'border-l-transparent text-gray-600 hover:bg-gray-50'}`}
                                    >
                                        Account Settings
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-6 py-4 font-medium text-red-500 hover:bg-red-50 transition-colors border-l-4 border-l-transparent border-t border-t-gray-50"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="w-full md:w-3/4">

                        {/* --- DASHBOARD TAB --- */}
                        {activeTab === 'dashboard' && (
                            <div className="space-y-6 animate-fade-in-down">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
                                        <div className="w-14 h-14 bg-gray-900 rounded-full flex items-center justify-center text-[#ff9900] mr-4 text-xl font-bold">
                                            {user.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900">{user.name}</h3>
                                            <p className="text-sm text-gray-500">{user.email}</p>
                                        </div>
                                    </div>
                                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl shadow-md text-white flex flex-col justify-center">
                                        <p className="text-gray-300 text-sm mb-1">Supplis Reward Points</p>
                                        <div className="flex items-end">
                                            <span className="text-4xl font-bold text-[#ff9900]">{user.rewardPoints}</span>
                                            <span className="ml-2 mb-1 text-gray-400 text-sm">pts</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
                                        <button onClick={() => setActiveTab('orders')} className="text-sm text-[#ff9900] font-bold hover:underline">View All</button>
                                    </div>
                                    <p className="text-gray-500 text-sm">Your latest order <strong className="text-gray-900">{orders[2].id}</strong> is currently <strong className="text-[#ff9900]">{orders[2].status}</strong>.</p>
                                </div>
                            </div>
                        )}

                        {/* --- ORDERS TAB --- */}
                        {activeTab === 'orders' && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-fade-in-down">
                                <div className="p-6 border-b border-gray-100">
                                    <h3 className="text-lg font-bold text-gray-900">Order History</h3>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                        <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
                                            <th className="p-4 font-medium">Order ID</th>
                                            <th className="p-4 font-medium">Date</th>
                                            <th className="p-4 font-medium">Item Summary</th>
                                            <th className="p-4 font-medium">Status</th>
                                            <th className="p-4 font-medium">Total</th>
                                        </tr>
                                        </thead>
                                        <tbody className="text-sm">
                                        {orders.map((order, idx) => (
                                            <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50">
                                                <td className="p-4 font-bold text-gray-900">{order.id}</td>
                                                <td className="p-4 text-gray-500">{order.date}</td>
                                                <td className="p-4 text-gray-700 truncate max-w-[200px]">{order.item}</td>
                                                <td className="p-4">
                                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                                            order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-[#d98200]'
                                                        }`}>
                                                            {order.status}
                                                        </span>
                                                </td>
                                                <td className="p-4 font-bold text-gray-900">{order.total}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* --- ADDRESSES TAB --- */}
                        {activeTab === 'addresses' && (
                            <div className="space-y-6 animate-fade-in-down">
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-lg font-bold text-gray-900">Shipping Addresses</h3>
                                        <button className="bg-gray-900 text-white text-sm px-4 py-2 rounded hover:bg-gray-800 transition-colors">Add New</button>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="border-2 border-[#ff9900] rounded-xl p-5 relative">
                                            <span className="absolute -top-3 left-4 bg-[#ff9900] text-black text-xs font-bold px-2 py-1 rounded">Default</span>
                                            <h4 className="font-bold text-gray-900 mb-2">{user.name}</h4>
                                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                                123 Fitness Avenue, Sector 14<br />
                                                Near Gymkhana Club<br />
                                                New Delhi, Delhi - 110001
                                            </p>
                                            <p className="text-gray-900 text-sm font-medium mb-4">Phone: {user.phone}</p>
                                            <div className="flex gap-3">
                                                <button className="text-sm font-bold text-gray-900 hover:text-[#ff9900]">Edit</button>
                                                <button className="text-sm font-bold text-red-500 hover:text-red-700">Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* --- SETTINGS TAB --- */}
                        {activeTab === 'settings' && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-fade-in-down">
                                <div className="p-6 border-b border-gray-100">
                                    <h3 className="text-lg font-bold text-gray-900">Account Settings</h3>
                                </div>
                                <form className="p-6 space-y-5" onSubmit={(e) => e.preventDefault()}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                            <input
                                                type="text"
                                                defaultValue={user.name}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#ff9900] focus:border-[#ff9900] outline-none transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                            <input
                                                type="text"
                                                defaultValue={user.phone}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#ff9900] focus:border-[#ff9900] outline-none transition-colors"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                        <input
                                            type="email"
                                            value={user.email}
                                            disabled
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-500 outline-none cursor-not-allowed"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">To change your email, please contact support.</p>
                                    </div>

                                    <div className="pt-4 mt-4 border-t border-gray-100">
                                        <h4 className="font-bold text-gray-900 mb-4">Change Password</h4>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                                                <input
                                                    type="password"
                                                    placeholder="••••••••"
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#ff9900] focus:border-[#ff9900] outline-none transition-colors"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                                                <input
                                                    type="password"
                                                    placeholder="Enter new password"
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#ff9900] focus:border-[#ff9900] outline-none transition-colors"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <button
                                            type="submit"
                                            className="bg-[#ff9900] hover:bg-orange-500 text-black font-bold px-6 py-3 rounded-lg transition-colors"
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account;
