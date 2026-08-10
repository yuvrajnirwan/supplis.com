const API_BASE_URL = process.env.VITE_API_BASE_URL || 'http://localhost:3000';
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://hboaizlxmcqlsefqqygi.supabase.co';

const ENDPOINT_MAP: Record<string, string[]> = {
    proteins: ['protein-products'],
    creatine: ['creatine-products'],
    'pre-workout': ['pre-workout-products'],
    aminos: ['amino-products'],
    'amino-acids': ['amino-products'],
    hydration: ['salt-products'],
    multivitamins: ['multivitamin-products'],
    vitamins: ['single-vitamin-products'],
    'omega-3': ['omega-products'],
    'd3-k2': ['single-vitamin-products'],
    'weight-management': ['weight-management-products'],
};

const ALL_ENDPOINTS = [
    'protein-products',
    'creatine-products',
    'pre-workout-products',
    'amino-products',
    'salt-products',
    'multivitamin-products',
    'omega-products',
    'single-vitamin-products',
    'weight-management-products'
];

function transformProduct(p: any) {
    const fullImageUrl = p.imageUrl ? (p.imageUrl.startsWith('http') ? p.imageUrl : `${SUPABASE_URL}${p.imageUrl}`) : 'https://via.placeholder.com/200x200?text=Product';
    
    return {
        id: p.id,
        name: p.name,
        category: p.category,
        description: p.description,
        brand: p.brand,
        nutritionFacts: p.nutritionFacts,
        priceInr: p.priceInr || 999,
        imageUrl: fullImageUrl,
        variants: p.variants || [
            {
                priceInr: p.priceInr || 999,
                mrpInr: p.mrpInr || p.priceInr || 1199,
                images: [{ url: fullImageUrl }]
            }
        ]
    };
}

async function fetchFromEndpoints(endpoints: string[]): Promise<any[]> {
    const promises = endpoints.map(endpoint =>
        fetch(`${API_BASE_URL}/${endpoint}`).then(res => {
            if (!res.ok) {
                console.warn(`Failed to fetch from ${endpoint}: ${res.statusText}`);
                return [];
            }
            return res.json();
        }).catch(err => {
            console.error(`Error fetching from ${endpoint}:`, err);
            return [];
        })
    );
    const results = await Promise.all(promises);
    return results.flat();
}

export async function getAllProducts(): Promise<any[]> {
    try {
        const flattened = await fetchFromEndpoints(ALL_ENDPOINTS);
        console.log(`Fetched ${flattened.length} total products from backend.`);
        return flattened.map(transformProduct);
    } catch (error) {
        console.error("Failed to fetch all products:", error);
        return [];
    }
}

export async function getProductsByCategorySlug(slug: string): Promise<any[]> {
    const endpoints = ENDPOINT_MAP[slug] || [];
    
    if (endpoints.length > 0) {
        try {
            const flattened = await fetchFromEndpoints(endpoints);
            console.log(`Fetched ${flattened.length} products for category ${slug}`);
            return flattened.map(transformProduct);
        } catch (error) {
            console.error(`Failed to fetch category ${slug}:`, error);
            return [];
        }
    }

    // Fallback search in all products if slug doesn't match endpoints
    const all = await getAllProducts();
    return all.filter(p => p.category?.toLowerCase().includes(slug.toLowerCase()));
}