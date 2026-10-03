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
    onNavigate('productos', 'todos');
  };

  // Maneja los clics de navegación limpiando la búsqueda previa
  const handleNavClick = (page, categoryOrSection = 'todos') => {
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

        {/* BARRA DE BÚSQUEDA */}
        <form 
          className="d-flex my-2 my-lg-0 me-auto" 
          onSubmit={handleSearchSubmit}
          style={{ width: '100%', maxWidth: '420px' }}
        >
          <input
            className="form-control me-2"
            type="search"
            placeholder="Buscar juego o consola..."
            aria-label="Buscar"
            value={searchInput}
            onChange={handleInputChange}
          />
          <button className="btn btn-pixel px-3" type="submit">
            Buscar
          </button>
        </form>

        {/* Botón hamburguesa para móviles */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Enlaces de Navegación y Carrito */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center gap-2">
            <li className="nav-item">
              <button
                className={`nav-link btn btn-link text-decoration-none ${currentPage === 'inicio' ? 'active fw-bold' : ''}`}
                onClick={() => handleNavClick('inicio')}
              >
                Inicio
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link btn btn-link text-decoration-none"
                onClick={() => handleNavClick('inicio', 'categorias')}
              >
                Categorías
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link btn btn-link text-decoration-none ${currentPage === 'productos' ? 'active fw-bold' : ''}`}
                onClick={() => handleNavClick('productos', 'todos')}
              >
                Productos
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link btn btn-link text-decoration-none ${currentPage === 'contacto' ? 'active fw-bold' : ''}`}
                onClick={() => handleNavClick('contacto')}
              >
                Contacto
              </button>
            </li>
            <li className="nav-item ms-lg-2">
              <button 
                className="btn btn-outline-pixel position-relative" 
                onClick={onOpenCart}
              >
                🛒 Carrito
                {totalItems > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {totalItems}
                  </span>
                )}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}