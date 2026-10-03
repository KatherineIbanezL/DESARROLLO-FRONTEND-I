import React from 'react';

export function Navbar({ totalItems, onOpenCart, currentPage, onNavigate }) {
  const handleNavClick = (e, page, categoryOrSection) => {
    e.preventDefault();
    onNavigate(page, categoryOrSection);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-pixel-dark sticky-top">
      <div className="container">
        <a 
          className="navbar-brand fw-bold fs-3 text-pixel-magenta" 
          href="#inicio"
          onClick={(e) => handleNavClick(e, 'inicio')}
        >
          Pixel Cross
        </a>

        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <a 
                className={`nav-link ${currentPage === 'inicio' ? 'active fw-bold' : ''}`}
                href="#inicio"
                onClick={(e) => handleNavClick(e, 'inicio')}
              >
                Inicio
              </a>
            </li>
            <li className="nav-item">
              <a 
                className="nav-link"
                href="#categorias"
                onClick={(e) => handleNavClick(e, 'inicio', 'categorias')}
              >
                Categorías
              </a>
            </li>
            <li className="nav-item">
              <a 
                className={`nav-link ${currentPage === 'productos' ? 'active fw-bold' : ''}`}
                href="#productos"
                onClick={(e) => handleNavClick(e, 'productos')}
              >
                Productos
              </a>
            </li>
            <li className="nav-item">
              <a 
                className={`nav-link ${currentPage === 'contacto' ? 'active fw-bold' : ''}`}
                href="#contacto"
                onClick={(e) => handleNavClick(e, 'contacto')}
              >
                Contacto
              </a>
            </li>
            <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
              <button className="btn btn-pixel position-relative" onClick={onOpenCart}>
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