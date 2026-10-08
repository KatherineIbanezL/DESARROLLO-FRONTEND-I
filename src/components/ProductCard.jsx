export function ProductCard({ product, cart = [], addToCart }) {
  const tieneOferta = Boolean(product.precioOferta);
  const precioFinal = tieneOferta ? product.precioOferta : product.precio;

  // Extrae el ID del producto asegurando compatibilidad con distintas claves
  const productId = product.id ?? product._id ?? product.codigo;

  // Verifica si el producto ya está en el carrito (convirtiendo a String)
  const isInCart = cart.some(
    (item) => String(item.id ?? item._id ?? item.codigo) === String(productId)
  );

  // Cálculo del porcentaje de descuento
  const porcentajeDescuento = tieneOferta
    ? Math.round(((product.precio - product.precioOferta) / product.precio) * 100)
    : 0;

  const handleAddToCart = () => {
    // Envía el producto asegurando que el precio a cobrar sea el precio final (con oferta si aplica)
    addToCart({
      ...product,
      id: productId,
      precio: precioFinal
    });
  };

  return (
    <div className="col-12 col-md-6 col-lg-4 mb-4">
      <div className="card h-100 shadow-sm card-pixel position-relative overflow-hidden">
        {/* Insignia de Oferta */}
        {tieneOferta && (
          <span className="badge-oferta-pixel">
            -{porcentajeDescuento}% OFF
          </span>
        )}

        {/* Imagen del producto con fallback y ruta base para GitHub Pages */}
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
          <h5 className="card-title fw-bold text-dark">
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

          {/* Botón dinámico*/}
          <button
            type="button"
            className={`btn w-100 fw-bold ${
              isInCart ? 'btn-pixel' : 'btn-pixel-purple'
            }`}
            onClick={handleAddToCart}
          >
            {isInCart ? 'En el carrito' : 'Agregar al Carrito'}
          </button>
        </div>
      </div>
    </div>
  );
}