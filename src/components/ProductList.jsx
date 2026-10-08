import { ProductCard } from './ProductCard';

export function ProductList({ products, cart, addToCart }) {
  return (
    <div className="row mt-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} cart={cart} addToCart={addToCart} />
      ))}
    </div>
  );
}