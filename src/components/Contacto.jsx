import React from 'react';

export function Contacto() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('¡Gracias por tu mensaje! Te responderemos a la brevedad.');
  };

  return (
    <main className="container my-5 flex-grow-1">
      <h1 className="text-center mb-4 fw-bold">Contacto</h1>
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
            <div className="mb-3">
              <label className="form-label fw-bold">Nombre Completo</label>
              <input type="text" className="form-control" placeholder="Tu nombre" required />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Correo Electrónico</label>
              <input type="email" className="form-control" placeholder="nombre@ejemplo.com" required />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Mensaje</label>
              <textarea className="form-control" rows="4" placeholder="Escribe tu consulta..." required></textarea>
            </div>
            <button type="submit" className="btn btn-primary w-100 fw-bold">
              Enviar Mensaje
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}