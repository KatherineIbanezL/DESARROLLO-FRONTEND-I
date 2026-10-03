import React from 'react';

export function ProductCard({ product, addToCart }) {
  const tieneOferta = Boolean(product.precioOferta);
  const precioFinal = tieneOferta ? product.precioOferta : product.precio;

  // Cálculo del porcentaje de descuento
  const porcentajeDescuento = tieneOferta
    ? Math.round(((product.precio - product.precioOferta) / product.precio) * 100)
    : 0;

  const handleAddToCart = () => {
    // Se envía el producto asegurando que el precio a cobrar sea el precio con oferta
    addToCart({
      ...product,
      precio: precioFinal
    });
  };

  return (
    <div className="col-12 col-md-6 col-lg-4 mb-4">
      <div className="card h-100 shadow-sm card-pixel position-relative overflow-hidden">
        {/* Insignia de Oferta */}
        {tieneOferta && (
          <span className="badge bg-danger position-absolute top-0 end-0 m-2 px-2 py-1 fs-6 z-1">
            -{porcentajeDescuento}% OFF
          </span>
        )}

        <img
          src={
            product.imagen 
              ? `${import.meta.env.BASE_URL}${product.imagen.replace(/^\//, '')}`
              : product.image
          }
          className="card-img-top"
          alt={product.titulo || product.nombre}
        />

        <div className="card-body d-flex flex-column">
          <h5 className="card-title fw-bold">
            {product.titulo || product.nombre || product.name}
          </h5>
          
          <p className="card-text text-muted flex-grow-1">
            {product.descripcion || product.description}
          </p>

          <div className="mb-3 d-flex align-items-center gap-2">
            {tieneOferta ? (
              <>
                <span className="text-decoration-line-through text-muted fs-6">
                  ${product.precio.toLocaleString('es-CL')}
                </span>
                <span className="fw-bold text-pixel-magenta fs-4">
                  ${product.precioOferta.toLocaleString('es-CL')}
                </span>
              </>
            ) : (
              <span className="fw-bold text-pixel-magenta fs-5">
                ${product.precio.toLocaleString('es-CL')}
              </span>
            )}
          </div>

          <button
            className="btn btn-pixel w-100 mt-auto py-2"
            onClick={handleAddToCart}
          >
            Agregar al Carrito
          </button>
        </div>
      </div>
    </div>
  );
}