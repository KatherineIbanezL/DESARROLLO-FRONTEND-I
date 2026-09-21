// =========================================================

// PROYECTO PIXEL CROSS - MANIPULACIÓN DEL DOM

// =========================================================

// 1. Estado Global
let productos = [];
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// 2. Inicialización
document.addEventListener('DOMContentLoaded', () => {
    actualizarCarritoUI();
    configurarEventosGlobales();
    cargarProductos();
});

// 3. Carga Externa de Datos mediante Fetch API
function cargarProductos() {
    fetch('assets/data/productos.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo cargar el catálogo de productos.');
            }
            return response.json();
        })
        .then(data => {
            productos = data;
            inicializarVistas();
        })
        .catch(error => {
            console.error('Error Fetch:', error);
            mostrarAlertaError('Ocurrió un problema al cargar los productos.');
        });
}

// 4. Detección de Página y Renderizado
function inicializarVistas() {
    // Si estamos en index.html
    const containerDestacados = document.getElementById('productos-destacados-container');
    if (containerDestacados) {
        renderizarIndex();
    }

    // Si estamos en productos.html
    const containerProductos = document.getElementById('productos-container');
    if (containerProductos) {
        renderizarPaginaProductos();
        configurarFiltrosCategoria();
    }
}

// Render para index.html
function renderizarIndex() {
    const destContainer = document.getElementById('productos-destacados-container');
    const coleccContainer = document.getElementById('coleccionables-destacados-container');

    if (destContainer) {
        // Filtra los primeros 3 productos de categoría Videojuegos
        const destacados = productos.filter(p => p.categoria === 'Videojuegos').slice(0, 3);
        destContainer.innerHTML = generarHTMLTarjetas(destacados);
    }

    if (coleccContainer) {
        // Filtra los primeros 3 productos de categoría TCG
        const coleccionables = productos.filter(p => p.categoria === 'TCG').slice(0, 3);
        coleccContainer.innerHTML = generarHTMLTarjetas(coleccionables);
    }

    asociarEventosAgregar();
}

// Render para productos.html (Soporta filtrado por URL ?categoria=... o ?buscar=...)
function renderizarPaginaProductos() {
    const container = document.getElementById('productos-container');
    if (!container) return;

    const urlParams = new URLSearchParams(window.location.search);
    const categoriaURL = urlParams.get('categoria');
    const terminoURL = urlParams.get('buscar');

    let productosFiltrados = productos;

    // 1. Filtrar por Categoría (si existe)
    if (categoriaURL) {
        productosFiltrados = productosFiltrados.filter(p => p.categoria.toLowerCase() === categoriaURL.toLowerCase());
        marcarBotonFiltroActivo(categoriaURL);
    }

    // 2. Filtrar por Búsqueda (si existe)
    if (terminoURL) {
        productosFiltrados = productosFiltrados.filter(p => 
            (p.titulo || p.nombre).toLowerCase().includes(terminoURL.toLowerCase()) ||
            p.categoria.toLowerCase().includes(terminoURL.toLowerCase())
        );
    }

    // 3. Renderizar la grilla con los productos filtrados
    renderizarGrilla(container, productosFiltrados);
}

function renderizarGrilla(contenedor, lista) {
    if (lista.length === 0) {
        contenedor.innerHTML = `<p class="col-12 text-center my-4 text-muted">No se encontraron productos en esta categoría.</p>`;
        return;
    }
    contenedor.innerHTML = generarHTMLTarjetas(lista);
    asociarEventosAgregar();
}

// Generador de HTML para Tarjetas
function generarHTMLTarjetas(lista) {
    return lista.map(prod => {
        const nombreProducto = prod.titulo || prod.nombre;
        return `
        <div class="col">
            <div class="card h-100 shadow-sm border-0">
                <img src="${prod.imagen}" class="card-img-top" alt="${nombreProducto}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title h6 fw-bold">${nombreProducto}</h5>
                    <p class="card-text text-pixel-magenta fw-bold mt-auto mb-3">$${Number(prod.precio).toLocaleString('es-CL')}</p>
                    <button class="btn btn-pixel btn-sm w-100 btn-agregar" data-id="${prod.id}">
                        Agregar al Carrito
                    </button>
                </div>
            </div>
        </div>
    `}).join('');
}

// 5. Gestión del Carrito (Agregar, Eliminar, Vaciar)
function asociarEventosAgregar() {
    const botones = document.querySelectorAll('.btn-agregar');
    botones.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.currentTarget.getAttribute('data-id'));
            agregarAlCarrito(id);
        });
    });
}

function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    if (!producto) return;

    const existe = carrito.find(p => p.id === id);
    if (existe) {
        existe.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    guardarYActualizarCarrito();
}

function eliminarDelCarrito(id) {
    carrito = carrito.filter(p => p.id !== id);
    guardarYActualizarCarrito();
}

function vaciarCarrito() {
    carrito = [];
    guardarYActualizarCarrito();
}

function guardarYActualizarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarritoUI();
}

// 6. Actualización Dinámica del DOM en Navbar y Modal
function actualizarCarritoUI() {
    // Contador en Navbar
    const contador = document.getElementById('contador-carrito');
    if (contador) {
        const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
        contador.innerText = totalItems;
    }

    // Modal del Carrito
    const listaCarrito = document.getElementById('lista-carrito');
    const totalCarrito = document.getElementById('total-carrito');

    if (listaCarrito) {
        listaCarrito.innerHTML = '';

        if (carrito.length === 0) {
            listaCarrito.innerHTML = `<li class="list-group-item text-center text-muted">El carrito está vacío.</li>`;
        } else {
            carrito.forEach(prod => {
                const nombreProducto = prod.titulo || prod.nombre;
                const li = document.createElement('li');
                li.className = 'list-group-item d-flex justify-content-between align-items-center';
                li.innerHTML = `
                    <div>
                        <strong>${nombreProducto}</strong>
                        <br>
                        <small class="text-muted">$${Number(prod.precio).toLocaleString('es-CL')} x ${prod.cantidad}</small>
                    </div>
                    <div>
                        <span class="fw-bold me-2">$${(prod.precio * prod.cantidad).toLocaleString('es-CL')}</span>
                        <button class="btn btn-outline-danger btn-sm btn-eliminar" data-id="${prod.id}">&times;</button>
                    </div>
                `;
                listaCarrito.appendChild(li);
            });

            document.querySelectorAll('.btn-eliminar').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const id = parseInt(e.currentTarget.getAttribute('data-id'));
                    eliminarDelCarrito(id);
                });
            });
        }
    }

    if (totalCarrito) {
        const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
        totalCarrito.innerText = `$${total.toLocaleString('es-CL')}`;
    }
}

// 7. Filtros por Botón en productos.html
function configurarFiltrosCategoria() {
    const contenedorFiltros = document.getElementById('contenedor-filtros');
    if (!contenedorFiltros) return;

    const botones = contenedorFiltros.querySelectorAll('button[data-categoria]');
    botones.forEach(btn => {
        btn.addEventListener('click', (e) => {
            botones.forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');

            const cat = e.currentTarget.getAttribute('data-categoria');
            const container = document.getElementById('productos-container');

            if (cat === 'todos') {
                renderizarGrilla(container, productos);
            } else {
                const filtrados = productos.filter(p => p.categoria.toLowerCase() === cat.toLowerCase());
                renderizarGrilla(container, filtrados);
            }
        });
    });
}

function marcarBotonFiltroActivo(categoria) {
    const botones = document.querySelectorAll('#contenedor-filtros button[data-categoria]');
    botones.forEach(b => {
        if (b.getAttribute('data-categoria').toLowerCase() === categoria.toLowerCase()) {
            b.classList.add('active');
        } else {
            b.classList.remove('active');
        }
    });
}

// 8. Eventos Globales (Búsqueda, Vaciar y Formulario de Contacto)
function configurarEventosGlobales() {
    // Vaciar Carrito
    const btnVaciar = document.getElementById('btn-vaciar');
    if (btnVaciar) {
        btnVaciar.addEventListener('click', vaciarCarrito);
    }

    // Buscador Navbar
    const formBusqueda = document.getElementById('form-busqueda');
    if (formBusqueda) {
        formBusqueda.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = document.getElementById('input-busqueda');
            if (!input) return;

            const termino = input.value.toLowerCase().trim();
            const containerProductos = document.getElementById('productos-container');

            if (containerProductos) {
                const resultado = productos.filter(p => 
                    (p.titulo || p.nombre).toLowerCase().includes(termino) || 
                    p.categoria.toLowerCase().includes(termino)
                );
                renderizarGrilla(containerProductos, resultado);
            } else {
                // Redirige pasando el parámetro de búsqueda por URL
                window.location.href = `productos.html?buscar=${encodeURIComponent(termino)}`;
            }
        });
    }

    // Formulario Contacto
    const formContacto = document.getElementById('form-contacto');
    if (formContacto) {
        formContacto.addEventListener('submit', (e) => {
            e.preventDefault();
            const divMensaje = document.getElementById('mensaje-contacto');
            if (divMensaje) {
                divMensaje.innerHTML = `
                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                        ¡Mensaje enviado con éxito! Te responderemos a la brevedad.
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                `;
            }
            formContacto.reset();
        });
    }
}

// Alerta de Error Fetch
function mostrarAlertaError(mensaje) {
    const main = document.querySelector('main');
    if (!main) return;
    const alerta = document.createElement('div');
    alerta.className = 'alert alert-danger alert-dismissible fade show container my-3';
    alerta.innerHTML = `
        ${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    main.prepend(alerta);
}