import React from 'react';

export function ShoppingCart({ cart, removeFromCart, updateQuantity, onClose }) {
  // Cálculo del total considerando precio de oferta o precio normal
  const total = cart.reduce((sum, item) => {
    const price = item.precioOferta || item.precio || item.price || 0;
    return sum + price * item.quantity;
  }, 0);

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header bg-pixel-dark text-white">
            <h5 className="modal-title">Carrito de Compras</h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            {cart.length === 0 ? (
              <p className="text-center my-3">El carrito está vacío.</p>
            ) : (
              <div className="table-responsive">
                <table className="table align-middle">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Precio</th>
                      <th>Cantidad</th>
                      <th>Subtotal</th>
                      <th>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => {
                      // Obtiene el precio con oferta si existe, si no el normal
                      const price = item.precioOferta || item.precio || item.price || 0;

                      return (
                        <tr key={item.id}>
                          {/* item.titulo para leer el nombre del JSON */}
                          <td className="fw-bold">
                            {item.titulo || item.nombre || item.name}
                          </td>
                          <td>${price.toLocaleString('es-CL')}</td>
                          <td>
                            <div className="btn-group btn-group-sm">
                              <button
                                className="btn btn-outline-secondary"
                                onClick={() => updateQuantity(item.id, -1)}
                              >
                                -
                              </button>
                              <span className="btn btn-light disabled">{item.quantity}</span>
                              <button
                                className="btn btn-outline-secondary"
                                onClick={() => updateQuantity(item.id, 1)}
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="fw-bold">
                            ${(price * item.quantity).toLocaleString('es-CL')}
                          </td>
                          <td>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => removeFromCart(item.id)}
                            >
                              Eliminar
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="modal-footer d-flex justify-content-between">
            <h4 className="m-0 fw-bold">Total: ${total.toLocaleString('es-CL')}</h4>
            <div>
              <button className="btn btn-secondary me-2" onClick={onClose}>
                Cerrar
              </button>
              {cart.length > 0 && (
                <button className="btn btn-pixel">Finalizar Compra</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}