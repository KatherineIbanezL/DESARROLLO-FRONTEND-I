import React, { useState, useEffect } from 'react';
import productosData from './data/productos.json';
import { Navbar } from './components/Navbar';
import { ProductList } from './components/ProductList';
import { ShoppingCart } from './components/ShoppingCart';
import { Home } from './components/Home';
import { Contacto } from './components/Contacto';
import { Footer } from './components/Footer';

export function App() {
  // 1. Estado de Navegación entre páginas ('inicio', 'productos', 'contacto')
  const [currentPage, setCurrentPage] = useState('inicio');

  // 2. Estado del carrito inicializado con localStorage
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('carrito');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // 3. Estados para Categorías y Búsqueda
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [searchQuery, setSearchQuery] = useState('');

  // 4. Guardar cambios del carrito en localStorage
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(cart));
  }, [cart]);

  // Función para cambiar de página y opcionalmente establecer una categoría
  const handleNavigate = (page, categoryOrSection = 'todos') => {
    setCurrentPage(page);
    
    if (categoryOrSection === 'categorias') {
      setTimeout(() => {
        const el = document.getElementById('categorias');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      setSelectedCategory(categoryOrSection);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Funciones de gestión del carrito
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, amount) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + amount;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Lógica de Filtrado para la sección de Productos
  const filteredProducts = productosData.filter((product) => {
    const productName = (product.nombre || product.titulo || '').toLowerCase();
    const productCategory = (product.categoria || '').toLowerCase();
    const query = searchQuery.toLowerCase().trim();

    const matchesCategory =
      selectedCategory === 'todos' ||
      productCategory === selectedCategory.toLowerCase();

    const matchesSearch =
      !query ||
      productName.includes(query) ||
      productCategory.includes(query);

    return matchesCategory && matchesSearch;
  });

  const categories = ['todos', ...new Set(productosData.map((p) => p.categoria).filter(Boolean))];
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navbar con control de páginas */}
      <Navbar 
        totalItems={totalItems} 
        onOpenCart={() => setIsCartOpen(true)}
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      {/* Renderizado Condicional según la página actual */}
      {currentPage === 'inicio' && (
        <Home addToCart={addToCart} onNavigate={handleNavigate} />
      )}

      {currentPage === 'productos' && (
        <main className="container my-4 flex-grow-1">
          <h1 className="text-center mb-4 fw-bold">Catálogo de Productos</h1>

          {/* Control de Búsqueda y Filtros de Categoría */}
          <div className="col-12 text-center">
            <div className="btn-group flex-wrap" role="group">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`btn ${
                    selectedCategory.toLowerCase() === cat.toLowerCase()
                      ? 'btn-pixel'
                      : 'btn-outline-pixel'
                  } text-capitalize m-1`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Listado de Productos Filtrados */}
          {filteredProducts.length === 0 ? (
            <p className="text-center text-muted my-5">
              No se encontraron productos que coincidan con los criterios de búsqueda.
            </p>
          ) : (
            <ProductList products={filteredProducts} addToCart={addToCart} />
          )}
        </main>
      )}

      {currentPage === 'contacto' && (
        <Contacto />
      )}

      {/* Modal del Carrito */}
      {isCartOpen && (
        <ShoppingCart
          cart={cart}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
          clearCart={clearCart}
          onClose={() => setIsCartOpen(false)}
        />
      )}

      <Footer />
    </div>
  );
}

export default App;