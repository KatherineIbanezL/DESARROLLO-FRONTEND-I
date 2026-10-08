import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ProductList } from './components/ProductList';
import { ShoppingCart } from './components/ShoppingCart';
import { Home } from './components/Home';
import { Contacto } from './components/Contacto';
import { Footer } from './components/Footer';

export function App() {
  const [currentPage, setCurrentPage] = useState('inicio');

  // Estados para la carga dinámica de productos
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estado para mostrar temporalmente el producto añadido al carrito
  const [toastMessage, setToastMessage] = useState(null);

  // Estado del carrito con localStorage
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('carrito');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [searchQuery, setSearchQuery] = useState('');

  // 1. useEffect para cargar dinámicamente el catálogo de productos con fetch
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setLoading(true);
        // import.meta.env.BASE_URL compatible con GitHub Pages
        const response = await fetch(`${import.meta.env.BASE_URL}data/productos.json`);
        
        if (!response.ok) {
          throw new Error('No se pudo cargar el catálogo de productos');
        }
        
        const data = await response.json();
        setProducts(data);
        setError(null);
      } catch (err) {
        console.error('Error al cargar productos:', err);
        setError('Ocurrió un error al cargar el catálogo. Intenta nuevamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  // 2. useEffect para persistencia en localStorage
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(cart));
  }, [cart]);

  // Navegación
  const handleNavigate = (page, categoryOrSection = 'todo') => {
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

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setSearchQuery('');
  };

  // Gestión de carrito
  const addToCart = (product) => {
    setCart((prevCart) => {
      const productId = product.id ?? product._id ?? product.codigo;
      const existing = prevCart.find(
        (item) => String(item.id ?? item._id ?? item.codigo) === String(productId)
      );

      if (existing) {
        return prevCart.map((item) =>
          String(item.id ?? item._id ?? item.codigo) === String(productId)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, id: productId, quantity: 1 }];
    });
  
    // Mostrar el nombre del producto en la notificación
    const nombreProducto = product.titulo || product.nombre || product.name;
    setToastMessage(`¡${nombreProducto} se añadió al carrito!`);

    // Ocultar notificación automáticamente después de 3 segundos
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Función para eliminar un producto específico del carrito
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => String(item.id ?? item._id ?? item.codigo) !== String(id)));
  };

  const updateQuantity = (id, amount) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (String(item.id ?? item._id ?? item.codigo) === String(id)) {
            const newQty = item.quantity + amount;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => setCart([]);

  // Filtrado dinámico usando la lista obtenida por fetch
  const filteredProducts = products.filter((product) => {
    const productName = (product.nombre || product.titulo || '').toLowerCase();
    const productCategory = (product.categoria || '').toLowerCase();
    const query = searchQuery.toLowerCase().trim();

    const matchesCategory =
      selectedCategory === 'todo' ||
      productCategory === selectedCategory.toLowerCase();

    const matchesSearch =
      !query ||
      productName.includes(query) ||
      productCategory.includes(query);

    return matchesCategory && matchesSearch;
  });

  const categories = ['todo', ...new Set(products.map((p) => p.categoria).filter(Boolean))];
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar 
        totalItems={totalItems} 
        onOpenCart={() => setIsCartOpen(true)}
        currentPage={currentPage}
        onNavigate={handleNavigate}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Renderizado condicional según estado de carga o error del fetch */}
      {loading ? (
        <div className="text-center my-5 py-5 flex-grow-1">
          <div className="spinner-border text-pixel-magenta" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-3 fw-bold">Cargando catálogo de productos...</p>
        </div>
      ) : error ? (
        <div className="alert alert-danger text-center my-5 mx-auto w-50 flex-grow-1" role="alert">
          {error}
        </div>
      ) : (
        <>
          {currentPage === 'inicio' && (
            <Home 
              products={products} 
              cart={cart} 
              addToCart={addToCart} 
              onNavigate={handleNavigate} 
            />
          )}

          {currentPage === 'productos' && (
            <main className="container my-4 flex-grow-1">
              {/* Título alineado a la izquierda */}
              <h1 className="text-start mb-3 text-pixel-purple fw-bold">Catálogo de Productos</h1>

              {/* BARRA DE FILTRADO ALINEADA A LA IZQUIERDA */}
              <div className="filter-bar-pixel mb-4 pb-2 border-bottom">
                <span className="filter-label-pixel text-pixel-purple">Filtrar por:</span>
                
                {categories.map((cat, index) => (
                  <React.Fragment key={cat}>
                    <button
                      type="button"
                      className={`filter-item-pixel text-capitalize ${
                        selectedCategory.toLowerCase() === cat.toLowerCase() ? 'active' : ''
                      }`}
                      onClick={() => handleCategoryChange(cat)}
                    >
                      {cat}
                    </button>

                    {/* Agrega el separador '|' salvo en la última opción */}
                    {index < categories.length - 1 && (
                      <span className="filter-separator-pixel">|</span>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Lista de productos filtrados */}
              {filteredProducts.length === 0 ? (
                <p className="text-center text-muted my-5">
                  No se encontraron productos que coincidan con los criterios de búsqueda.
                </p>
              ) : (
                <ProductList products={filteredProducts} cart={cart} addToCart={addToCart} />
              )}
            </main>
          )}

          {/* VISTA DE CONTACTO */}
          {currentPage === 'contacto' && <Contacto />}
        </>
      )}

      {/* NOTIFICACIÓN DEL MENSAJE TOAST FLOTANTE */}
      {toastMessage && (
        <div className="toast-container position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1055 }}>
          <div className="toast show align-items-center toast-pixel" role="alert">
            <div className="d-flex">
              <div className="toast-body fw-bold fs-6">
                {toastMessage}
              </div>
              <button 
                type="button" 
                className="btn-close btn-close-white me-2 m-auto" 
                onClick={() => setToastMessage(null)}
              ></button>
            </div>
          </div>
        </div>
      )}

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