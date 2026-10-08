export function ShoppingCart({ cart = [], removeFromCart, updateQuantity, clearCart, onClose }) {
  // Cálculo del total acumulado con validación de seguridad
  const total = cart.reduce((sum, item) => {
    if (!item) return sum;
    const price = item.precioOferta || item.precio || item.price || 0;
    return sum + price * item.quantity;
  }, 0);

  return (
    <div id="modalCarrito" className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          
          <div className="modal-header bg-pixel-dark text-white">
            <h5 className="modal-title fw-bold text-pixel-magenta">Carrito de Compras</h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose} aria-label="Cerrar"></button>
          </div>

          <div className="modal-body p-4">
            {!cart || cart.length === 0 ? (
              <p className="text-center my-4 fs-5">El carrito está vacío.</p>
            ) : (
              /* id="lista-carrito" activa el estilo de fondo claro y bordes suaves */
              <ul id="lista-carrito" className="list-group list-group-flush">
                {cart.map((item, index) => {
                  if (!item) return null; 
                  
                  const itemId = item.id || item._id || item.codigo || index;
                  const price = item.precioOferta || item.precio || item.price || 0;
                  const name = item.titulo || item.nombre || item.name || 'Producto Desconocido';

                  return (
                    <li key={itemId} className="list-group-item p-3 shadow-sm border-0 mb-3">
                      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center w-100 gap-3">
                        
                        {/* Nombre del Producto */}
                        <span className="fw-bold fs-5 text-center text-md-start" style={{ flex: '1' }}>
                          {name}
                        </span>
                        
                        {/* Controles de Cantidad */}
                        <div className="btn-group btn-group-sm">
                          <button type="button" className="btn btn-outline-secondary px-3" onClick={() => updateQuantity(itemId, -1)}>-</button>
                          <span className="btn btn-light disabled text-dark px-3 fw-bold">{item.quantity}</span>
                          <button type="button" className="btn btn-outline-secondary px-3" onClick={() => updateQuantity(itemId, 1)}>+</button>
                        </div>

                        {/* Subtotal y Botón de Eliminar */}
                        <div className="d-flex align-items-center gap-3">
                          <span className="fw-bold text-pixel-magenta fs-5">
                            ${(price * item.quantity).toLocaleString('es-CL')}
                          </span>
      
                          <button 
                            type="button"
                            className="btn btn-eliminar-item px-3 py-1 fw-bold" 
                            onClick={() => removeFromCart(itemId)}
                            title="Eliminar producto"
                          >
                            Eliminar
                          </button>
                        </div>

                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <div className="modal-footer d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
            <h4 className="m-0 fw-bold">Total: ${total.toLocaleString('es-CL')}</h4>
            <div className="d-flex gap-2 w-100 w-md-auto justify-content-end">
              {cart.length > 0 && clearCart && (
                <button type="button" className="btn btn-outline-danger fw-bold" onClick={clearCart}>
                  Vaciar
                </button>
              )}
              <button type="button" className="btn btn-outline-pixel" onClick={onClose}>
                Seguir Comprando
              </button>
              {cart.length > 0 && (
                <button type="button" className="btn btn-pixel">Finalizar compra</button>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}