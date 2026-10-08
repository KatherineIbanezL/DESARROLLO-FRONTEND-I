import { useState } from 'react';

export function Contacto() {
  const [formData, setFormData] = useState({ nombre: '', email: '', mensaje: '' });
  const [alerta, setAlerta] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nombre.trim() || !formData.email.trim() || !formData.mensaje.trim()) {
      setAlerta({ tipo: 'danger', mensaje: 'Por favor, completa todos los campos requeridos.' });
      return;
    }

    setAlerta({ tipo: 'success', mensaje: '¡Gracias por contactarnos! Tu mensaje ha sido enviado correctamente.' });
    setFormData({ nombre: '', email: '', mensaje: '' });
  };

  return (
    <main className="container my-5 flex-grow-1">
      <h1 className="text-center mb-4 fw-bold text-pixel-purple">Contacto</h1>
      
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <form onSubmit={handleSubmit} className="card card-contacto-pixel p-4">
            
            {/* Renderizado condicional de Alerta */}
            {alerta && (
              <div 
                className={`alert ${
                  alerta.tipo === 'success' ? 'alert-pixel-success' : 'alert-danger'
                } alert-dismissible fade show fw-bold mb-4`} 
                role="alert"
              >
                {alerta.mensaje}
                <button 
                  type="button" 
                  className={`btn-close ${alerta.tipo === 'success' ? 'btn-close-white' : ''}`} 
                  onClick={() => setAlerta(null)}
                  aria-label="Cerrar"
                ></button>
              </div>
            )}

            <div className="mb-3">
              <label htmlFor="nombreInput" className="form-label fw-bold text-pixel-magenta">
                Nombre Completo
              </label>
              <input 
                id="nombreInput"
                type="text" 
                name="nombre"
                className="form-control" 
                placeholder="Tu nombre" 
                value={formData.nombre}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="emailInput" className="form-label fw-bold text-pixel-magenta">
                Correo Electrónico
              </label>
              <input 
                id="emailInput"
                type="email" 
                name="email"
                className="form-control" 
                placeholder="nombre@ejemplo.com" 
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="mensajeInput" className="form-label fw-bold text-pixel-magenta">
                Mensaje
              </label>
              <textarea 
                id="mensajeInput"
                name="mensaje"
                className="form-control" 
                rows="4" 
                placeholder="Escribe tu consulta..."
                value={formData.mensaje}
                onChange={handleChange}
              ></textarea>
            </div>

            <button type="submit" className="btn btn-pixel w-100 fw-bold py-2 fs-5">
              Enviar Mensaje
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}