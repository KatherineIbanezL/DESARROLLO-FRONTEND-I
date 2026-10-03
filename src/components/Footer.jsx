import React from 'react';

export function Footer() {
  return (
    <footer className="bg-pixel-dark text-white text-center py-4 mt-5">
      <div className="container">
        <p className="mb-1">&copy; 2026 Pixel Cross. Todos los derechos reservados.</p>
        <p className="mb-0">
          Contacto: <a href="mailto:contacto@pixelcross.cl" className="text-pixel-magenta text-decoration-none">contacto@pixelcross.cl</a>
        </p>
      </div>
    </footer>
  );
}