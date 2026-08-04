// src/data/index.ts
import proteins from './proteins.json';
import preworkouts from './preworkout.json';
import aminos from './aminos.json';
import salts from './salts.json';
import multivitamins from './multivitamins.json';
import omegas from './omegas.json';
import singleVitamins from './vitamins.json';
import weightManagement from './weightManagement.json';

export const ALL_PRODUCTS = [
    ...proteins,
    ...preworkouts,
    ...aminos,
    ...salts,
    ...multivitamins,
    ...omegas,
    ...singleVitamins,
    ...weightManagement,
];

export function getProductsByCategory(categoryName: string) {
    return ALL_PRODUCTS.filter(
        (product) => product.category.toLowerCase() === categoryName.toLowerCase()
    );
}

export function getProductsByBrand(brandName: string) {
    return ALL_PRODUCTS.filter(
        (product) => product.brand.toLowerCase() === brandName.toLowerCase()
    );
}