# Pixel Cross - Tienda de Videojuegos y Coleccionables

Proyecto web responsivo desarrollado con **HTML5, CSS3, Bootstrap 5 y JavaScript (ES6+)**. Implementa carga dinámica de productos mediante **Fetch API**, manipulación directa del **DOM** para la gestión de un carrito de compras interactivo con **LocalStorage**, y validación con feedback visual en el formulario de contacto.

---

## Funcionalidades Principales

* **Carga Asíncrona (Fetch API):** Obtención dinámica del catálogo desde un archivo `JSON` externo.
* **Diseño Responsivo:** Adaptación completa a dispositivos móviles, tablets y computadoras utilizando la grilla de **Bootstrap 5**.
* **Carrito de Compras Interactivo:**
  * Contador dinámico de ítems en el Navbar.
  * Cálculo automático del total a pagar.
  * Modificación de cantidades, eliminación individual y vaciado del carrito.
  * Persistencia de datos mediante `localStorage`.
* **Filtrado y Buscador Dinámico:** Filtrado inmediato por categorías (Videojuegos, TCG, Accesorios) y búsqueda por texto en tiempo real.
* **Formulario de Contacto:** Gestión de eventos `submit` con mensajes interactivos de alerta.

---

## Tecnologías Utilizadas

* **HTML5:** Estructuración semántica de las distintas páginas.
* **CSS3 / Bootstrap 5:** Maquetación responsiva, componentes visuales y utilidades.
* **JavaScript (ES6+):** Programación modular, manipulación del DOM y manejo de eventos.
* **Fetch API:** Consumo de datos externos.
* **LocalStorage:** Almacenamiento persistente del estado del carrito en el navegador.

---

## Evidencias de Funcionamiento y Adaptabilidad

### Vista Escritorio (Desktop)

#### 1. Página de Inicio y Catálogo General
![Inicio Desktop](assets/img/capturas/Desktop-inicio.png)
![Catálogo Productos](assets/img/capturas/Desktop-productos.png)

#### 2. Filtro por Categorías y Buscador
![Filtro por Categorías](assets/img/capturas/Desktop-filtro-categorias.png)
![Búsqueda Dinámica](assets/img/capturas/Desktop-busqueda.png)

#### 3. Carrito de Compras (Vacío y Lleno)
![Carrito Vacío](assets/img/capturas/Desktop-carrito-vacio.png)
![Carrito Lleno](assets/img/capturas/Desktop-carrito-lleno.png)

#### 4. Formulario de Contacto y Feedback
![Envío Exitoso Formulario](assets/img/capturas/Desktop-formulario-exitoso.png)

---

### Vista Móvil (Mobile)

#### 1. Navegación e Inicio
![Inicio Móvil](assets/img/capturas/Movil-inicio.png)

#### 2. Filtro de Categorías y Buscador
![Filtro Móvil](assets/img/capturas/Movil-filtro-categorias.png)
![Búsqueda Móvil](assets/img/capturas/Movil-busqueda.png)

#### 3. Carrito de Compras y Contacto
![Carrito Móvil](assets/img/capturas/Movil-carrito.png)
![Contacto Móvil](assets/img/capturas/Movil-contacto.png)

---

## Despliegue

El proyecto se encuentra alojado y disponible en **GitHub Pages**:
`https://KatherineIbanezL.github.io/DESARROLLO-FRONTEND-I/`