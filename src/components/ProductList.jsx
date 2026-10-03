import React from 'react';
import { ProductCard } from './ProductCard';

export function ProductList({ products, addToCart }) {
  return (
    <div className="row mt-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} addToCart={addToCart} />
      ))}
    </div>
  );
}