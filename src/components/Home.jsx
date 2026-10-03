import React from 'react';
import { ProductCard } from './ProductCard';
import productosData from '../data/productos.json';

export function Home({ addToCart, onNavigate }) {
  const videojuegosDestacados = productosData.filter(
    (p) => p.categoria === 'Videojuegos' && p.destacado
  );

  const coleccionablesDestacados = productosData.filter(
    (p) => p.categoria === 'TCG' && p.destacado
  );

  return (
    <>
      {/* CARRUSEL DE IMÁGENES */}
      <header id="inicio">
        <div id="carouselPixelCross" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselPixelCross" data-bs-slide-to="0" className="active" aria-current="true"></button>
            <button type="button" data-bs-target="#carouselPixelCross" data-bs-slide-to="1"></button>
            <button type="button" data-bs-target="#carouselPixelCross" data-bs-slide-to="2"></button>
          </div>

          <div className="carousel-inner">
            <div className="carousel-item active" data-bs-interval="3000">
              <img 
                src="./img/portada-banner.jpeg" 
                className="d-block w-100" 
                alt="Banner Novedades Pixel Cross"
              />
              <div className="carousel-caption d-none d-md-block carousel-caption-pixel">
                <h5>Grandes Lanzamientos</h5>
                <p className="mb-0">Encuentra los mejores títulos para todas tus consolas.</p>
              </div>
            </div>
            <div className="carousel-item" data-bs-interval="3000">
              <img 
                src="./img/1200_800.jpeg" 
                className="d-block w-100" 
                alt="Reservas temporada"
              />
              <div className="carousel-caption d-none d-md-block carousel-caption-pixel">
                <h5>Los mejores de temporada y preventas exclusivas</h5>
                <p className="mb-0">Aprovecha las preventas y reserva lo nuevo.</p>
              </div>
            </div>
            <div className="carousel-item" data-bs-interval="3000">
              <img 
                src="./img/mas-vendidos.webp" 
                className="d-block w-100" 
                alt="Los más vendidos"
              />
              <div className="carousel-caption d-none d-md-block carousel-caption-pixel">
                <h5>Los más vendidos</h5>
                <p className="mb-0">Promociones y descuentos especiales en los productos más populares.</p>
              </div>
            </div>
          </div>

          <button className="carousel-control-prev" type="button" data-bs-target="#carouselPixelCross" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Anterior</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselPixelCross" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Siguiente</span>
          </button>
        </div>
      </header>

      <main className="container my-5">
        {/* SECCIÓN DE CATEGORÍAS PRINCIPALES */}
        <section id="categorias" className="mb-5">
          <h2 className="text-center mb-4 fw-bold">Categorías Principales</h2>
          <div className="row g-3 justify-content-center">
            <div className="col-6 col-md-3">
              <button onClick={() => onNavigate('productos', 'TCG')} className="btn btn-categoria">TCG</button>
            </div>
            <div className="col-6 col-md-3">
              <button onClick={() => onNavigate('productos', 'Nintendo')} className="btn btn-categoria">Nintendo</button>
            </div>
            <div className="col-6 col-md-3">
              <button onClick={() => onNavigate('productos', 'PlayStation')} className="btn btn-categoria">PlayStation</button>
            </div>
            <div className="col-6 col-md-3">
              <button onClick={() => onNavigate('productos', 'Accesorios')} className="btn btn-categoria">Accesorios</button>
            </div>
          </div>
        </section>

        {/* VIDEOJUEGOS DESTACADOS */}
        <section className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold m-0">Videojuegos Destacados</h2>
            <button onClick={() => onNavigate('productos')} className="btn btn-outline-pixel">
              Ver Todo el Catálogo &rarr;
            </button>
          </div>
          <div className="row">
            {videojuegosDestacados.map((product) => (
              <ProductCard key={product.id} product={product} addToCart={addToCart} />
            ))}
          </div>
        </section>

        {/* COLECCIONABLES DESTACADOS */}
        <section className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold m-0">Coleccionables Destacados</h2>
            <button onClick={() => onNavigate('productos', 'TCG')} className="btn btn-outline-pixel">
              Ver Más Coleccionables &rarr;
            </button>
          </div>
          <div className="row">
            {coleccionablesDestacados.map((product) => (
              <ProductCard key={product.id} product={product} addToCart={addToCart} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}