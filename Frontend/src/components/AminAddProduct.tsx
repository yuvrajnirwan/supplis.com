import React, { useState } from 'react';
import { supabase } from '../utils/supabaseClient'; // Make sure this path matches where you saved your client

export const AdminAddProduct: React.FC = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    // State to hold the actual image file
    const [imageFile, setImageFile] = useState<File | null>(null);

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        category: 'Proteins',
        mrpInr: '',
        priceInr: '',
        description: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleAddProduct = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!imageFile) {
            alert("Please select a product image first!");
            return;
        }

        setIsSubmitting(true);

        try {
            // --- 1. UPLOAD IMAGE TO SUPABASE STORAGE ---
            // Create a unique file name to prevent overwriting
            const fileExt = imageFile.name.split('.').pop();
            const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;

            // Map the form category to your exact Supabase folder names!
            let folderName = 'Proteins'; // Default fallback
            if (formData.category === 'Proteins') folderName = 'Proteins';
            if (formData.category === 'Pre-Workout') folderName = 'Preworkout';
            if (formData.category === 'Creatine') folderName = 'Creatines';
            if (formData.category === 'Vitamins') folderName = 'Multivitamins';

            // Create the dynamic file path based on the selected category
            const filePath = `${folderName}/${fileName}`;

            // Upload the file to your 'Supplies' bucket
            const { error: uploadError } = await supabase.storage
                .from('Supplies')
                .upload(filePath, imageFile);

            if (uploadError) throw uploadError;

            // --- 2. GET THE PUBLIC URL ---
            const { data: urlData } = supabase.storage
                .from('Supplies')
                .getPublicUrl(filePath);

            const finalImageUrl = urlData.publicUrl;

            // --- 3. SAVE TO DATABASE ---
            const newProduct = {
                id: `prod_${Date.now()}`,
                name: formData.name,
                category: formData.category,
                mrpInr: Number(formData.mrpInr),
                priceInr: Number(formData.priceInr),
                description: formData.description,
                imageUrl: finalImageUrl // Here is the URL we generated!
            };

            console.log("Ready to save to DB:", newProduct);

            // 👇 THIS IS WHERE YOU WILL CALL YOUR DATABASE API 👇
            // Example: await axios.post('http://localhost:3000/api/products', newProduct);

            alert(`Success! ${formData.name} added. \nImage saved to the ${folderName} folder at: \n${finalImageUrl}`);

            // Reset form
            setFormData({ name: '', category: 'Proteins', mrpInr: '', priceInr: '', description: '' });
            setImageFile(null);

            // Reset the file input visually in the DOM
            const fileInput = document.getElementById('productImage') as HTMLInputElement;
            if (fileInput) fileInput.value = '';

        } catch (error: any) {
            console.error("Error uploading product:", error);
            alert("Error: " + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-light min-vh-100 py-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <div className="card border-0 shadow-sm rounded-4">
                            <div className="card-header bg-dark text-white p-4 border-0 rounded-top-4 d-flex justify-content-between align-items-center">
                                <h4 className="mb-0 fw-bold">Admin Panel</h4>
                                <span className="badge bg-warning text-dark">Add Product</span>
                            </div>

                            <div className="card-body p-4">
                                <form onSubmit={handleAddProduct}>
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Product Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="form-control bg-light"
                                            placeholder="e.g. 100% Whey Protein Isolate"
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Category</label>
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleInputChange}
                                            className="form-select bg-light"
                                            required
                                        >
                                            <option value="Proteins">Proteins</option>
                                            <option value="Pre-Workout">Pre-Workout</option>
                                            <option value="Creatine">Creatine</option>
                                            <option value="Vitamins">Vitamins</option>
                                        </select>
                                    </div>

                                    <div className="row g-3 mb-3">
                                        <div className="col-md-6">
                                            <label className="form-label fw-bold">MRP (₹)</label>
                                            <input
                                                type="number"
                                                name="mrpInr"
                                                value={formData.mrpInr}
                                                onChange={handleInputChange}
                                                className="form-control bg-light"
                                                placeholder="e.g. 2999"
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label fw-bold">Selling Price (₹)</label>
                                            <input
                                                type="number"
                                                name="priceInr"
                                                value={formData.priceInr}
                                                onChange={handleInputChange}
                                                className="form-control bg-light"
                                                placeholder="e.g. 2199"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* File Upload Input */}
                                    <div className="mb-3 border p-3 rounded bg-light">
                                        <label className="form-label fw-bold">Upload Product Image</label>
                                        <input
                                            id="productImage"
                                            type="file"
                                            accept="image/png, image/jpeg, image/webp"
                                            onChange={handleFileChange}
                                            className="form-control"
                                            required
                                        />
                                        <small className="text-muted d-block mt-2">Recommended: Square image, max 2MB. Image will be sorted into category folders automatically.</small>
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label fw-bold">Description</label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            className="form-control bg-light"
                                            rows={4}
                                            placeholder="Enter product details and benefits..."
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="btn btn-warning w-100 fw-bold py-3"
                                        style={{ backgroundColor: '#ff9900', border: 'none' }}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                Uploading to Supabase...
                                            </>
                                        ) : (
                                            'Add Product to Store'
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminAddProduct;