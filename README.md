# Pixel Cross - Tienda de Videojuegos y Coleccionables

Proyecto web responsivo desarrollado con **React**, **Vite**, **Bootstrap 5** y **CSS3**. Implementa una arquitectura modular basada en componentes, gestión de estado con Hooks (`useState`, `useEffect`), un sistema de ofertas y descuentos, carrito de compras y filtrado dentro del catálogo.

---

## Tabla de Contenidos
1. [Funcionalidades Principales](#funcionalidades-principales)
2. [Tecnologías Utilizadas](#tecnologías-utilizadas)
3. [Requisitos Previos](#requisitos-previos)
4. [Instalación y Configuración Local](#instalación-y-configuración-local)
5. [Instrucciones de Uso](#instrucciones-de-uso)
6. [Estructura del Proyecto](#estructura-del-proyecto)
7. [Despliegue](#despliegue)

---

## Funcionalidades Principales

- **Arquitectura Modular en React:** Estructuración mediante componentes reutilizables (`Navbar`, `Home`, `ProductList`, `ProductCard`, `ShoppingCart`, `Contacto`, `Footer`).
- **Sistema de Ofertas y Descuentos:** 
  - Cálculo automático del porcentaje de descuento (`-X% OFF`).
  - Muestra del precio original junto al precio promocional en productos destacados.
  - Aplicación automática de la oferta dentro de los cálculos del carrito.
- **Carrito de Compras Interactivo:**
  - Contador de artículos en tiempo real sobre el botón del Navbar.
  - Modal interactivo con desglose en tabla.
  - Control de cantidades, eliminación individual e integración de botones de acción.
  - Persistencia de datos en el navegador mediante `localStorage`.
- **Buscador y Filtro por Categorías:**
  - Filtrado interactivo en tiempo real por categorías.
  - Barra de búsqueda por texto directo para productos y categorías.
- **Diseño Responsivo y Tema Personalizado:**
  - Adaptación completa a móviles, tablets y computadoras mediante la grilla de **Bootstrap 5**.
  - Identidad visual propia utilizando variables CSS personalizadas.
- **Navegación Dinámica:** Transición entre secciones (Inicio, Catálogo, Contacto) sin recargar la página.

---

## Tecnologías Utilizadas

- **React (v18+):** Biblioteca de JavaScript para la construcción de interfaces de usuario basadas en componentes.
- **Vite:** Entorno de desarrollo rápido y empaquetador de módulos.
- **JavaScript (ES6+):** Programación funcional, manipulación de arreglos y Hooks (`useState`, `useEffect`).
- **Bootstrap 5 (CDN) & CSS3:** Sistema de maquetación, componentes UI y variables globales.
- **JSON:** Fuente de datos local para la carga de productos y gestión del catálogo.
- **LocalStorage API:** Persistencia del carrito de compras en el navegador del usuario.

---

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado en tu equipo:
- [Node.js](https://nodejs.org/) (versión 18.0.0 o superior recomendada).
- [npm](https://www.npmjs.com/) (incluido junto con Node.js) o `yarn`.
- [Git](https://git-scm.com/) para clonar el repositorio.

---

## Instalación y Configuración Local

Sigue estos pasos para ejecutar el proyecto en tu entorno local:

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/KatherineIbanezL/DESARROLLO-FRONTEND-I.git](https://github.com/KatherineIbanezL/DESARROLLO-FRONTEND-I.git)
   ```

2. **Acceder al directorio del proyecto:**
   ```bash
   cd DESARROLLO-FRONTEND-I
   ```

3. **Instalar las dependencias:**
   ```bash
   npm install
   ```

4. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

5. **Abrir en el navegador:**
   Copia la dirección local indicada en la consola (por lo general `http://localhost:5173/`) y ábrela en tu navegador preferido.

6. **Construcción para producción (Opcional):**
   Para generar los archivos optimizados de producción:
   ```bash
   npm run build
   ```

---

## Instrucciones de Uso

1. **Navegación general:**
   - Utiliza la barra de navegación superior (`Navbar`) para desplazarte entre **Inicio**, **Catálogo** y **Contacto**.

2. **Explorar productos y filtrar:**
   - En la sección **Catálogo**, selecciona una categoría específica (Videojuegos, TCG, Accesorios) utilizando los botones de filtro.
   - Utiliza la **barra de búsqueda** para filtrar productos por su título en tiempo real.

3. **Gestión del Carrito de Compras:**
   - Haz clic en el botón **"Añadir al Carrito"** en cualquier tarjeta de producto para agregarlo.
   - Presiona el ícono del carrito en el `Navbar` para abrir el modal del carrito de compras.
   - Dentro del modal puedes:
     - Incrementar o decrementar la cantidad de cada producto.
     - Eliminar productos individualmente.
     - Consultar el desglose de precios y el total a pagar.
     - Los artículos agregados permanecerán guardados incluso si recargas la página.

4. **Formulario de Contacto:**
   - Dirígete a la sección **Contacto**.
   - Completa los campos solicitados (Nombre, Correo electrónico y Mensaje).
   - El formulario cuenta con validación de datos antes del envío.

---

## Estructura del Proyecto

```text
public/
└── img/                  # Imágenes de banners, carrusel y productos
src/
├── assets/
│   └── css/
│       └── estilos.css   # Estilos y variables personalizadas
├── components/
│   ├── Contacto.jsx      # Formulario y vista de contacto
│   ├── Footer.jsx        # Pie de página
│   ├── Home.jsx          # Vista principal con carrusel y destacados
│   ├── Navbar.jsx        # Barra de navegación con contador de carrito
│   ├── ProductCard.jsx   # Tarjeta individual con insignias de oferta
│   ├── ProductList.jsx   # Contenedor y grilla de productos
│   └── ShoppingCart.jsx  # Modal interactivo del carrito de compras
├── data/
│   └── productos.json    # Base de datos del catálogo
├── App.jsx               # Componente principal y gestión de estados
└── main.jsx              # Punto de entrada de React
```

---

## Despliegue

El proyecto se encuentra alojado y disponible en **GitHub Pages**:
`https://KatherineIbanezL.github.io/DESARROLLO-FRONTEND-I/`