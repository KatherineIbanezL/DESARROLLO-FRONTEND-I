import React, { useState, useEffect } from 'react';

export function Navbar({ 
  totalItems, 
  onOpenCart, 
  currentPage, 
  onNavigate, 
  searchQuery = '', 
  setSearchQuery 
}) {
  const [searchInput, setSearchInput] = useState(searchQuery);

  // Sincroniza el campo con el estado global de búsqueda
  useEffect(() => {
    setSearchInput(searchQuery);
  }, [searchQuery]);

  // Maneja la escritura en el input
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    
    // Si el usuario borra todo el texto, resetea la búsqueda inmediatamente
    if (value.trim() === '' && setSearchQuery) {
      setSearchQuery('');
    }
  };

  // Maneja el envío del formulario de búsqueda
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (setSearchQuery) {
      setSearchQuery(searchInput);
    }
    // Redirige a productos y resetea la categoría a 'todos' para buscar en todo el catálogo
    onNavigate('productos', 'todo');
  };

  // Maneja los clics de navegación limpiando la búsqueda previa
  const handleNavClick = (page, categoryOrSection = 'todo') => {
    if (setSearchQuery) {
      setSearchQuery('');
    }
    setSearchInput('');
    onNavigate(page, categoryOrSection);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-pixel-dark sticky-top shadow py-2">
      <div className="container">
        {/* Logo */}
        <a 
          className="navbar-brand fw-bold text-pixel-magenta fs-3 me-3 me-lg-4" 
          href="#" 
          onClick={(e) => { e.preventDefault(); handleNavClick('inicio'); }}
        >
          Pixel Cross
        </a>

        {/* CONTENEDOR Carrito + Toggle */}
        <div className="d-flex align-items-center order-lg-last">
          {/* BOTÓN CARRITO */}
          <button 
            className="btn btn-nav-icon position-relative p-1 border-0 me-3 me-lg-2" 
            onClick={onOpenCart}
            aria-label="Ver carrito"
          >
            <img 
              src={`${import.meta.env.BASE_URL}img/icons8-shopping-cart-48.png`} 
              alt="Carrito" 
              className="cart-icon-img"
            />
            {totalItems > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-light">
                {totalItems}
              </span>
            )}
          </button>

          {/* Botón hamburguesa */}
          <button
            className="navbar-toggler navbar-toggler-pixel border-0 p-1"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        {/* Menú Colapsable */}
        <div className="collapse navbar-collapse" id="navbarNav">

          {/* BARRA DE BÚSQUEDA */}
          <form 
            className="d-flex search-form-pixel my-3 my-lg-0 me-lg-auto" 
            onSubmit={handleSearchSubmit}
          >
            <input
              className="form-control me-2"
              type="search"
              placeholder="Buscar juego o consola..."
              value={searchInput}
              onChange={handleInputChange}
            />
            <button className="btn btn-pixel px-3" type="submit">
              Buscar
            </button>
          </form>
          
          {/* Enlaces de Navegación */}
          <ul className="navbar-nav ms-auto align-items-lg-center gap-2 text-center text-lg-start">
            <li className="nav-item">
              <button
                className={`nav-link nav-link-pixel ${currentPage === 'inicio' ? 'active' : ''}`}
                onClick={() => handleNavClick('inicio')}
              >
                Inicio
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link nav-link-pixel"
                onClick={() => handleNavClick('inicio', 'categorias')}
              >
                Categorías
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link nav-link-pixel ${currentPage === 'productos' ? 'active' : ''}`}
                onClick={() => handleNavClick('productos', 'todo')}
              >
                Productos
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link nav-link-pixel ${currentPage === 'contacto' ? 'active' : ''}`}
                onClick={() => handleNavClick('contacto')}
              >
                Contacto
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}