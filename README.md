# Pixel Cross - Tienda de Videojuegos y Coleccionables

Proyecto web responsivo desarrollado con **React**, **Vite**, **Bootstrap 5** y **CSS3**. Implementa una arquitectura modular basada en componentes, gestión de estado con Hooks (`useState`, `useEffect`), un sistema de ofertas y descuentos, carrito de compras y filtrado en tiempo real dentro del catálogo.

---

## Funcionalidades Principales

- **Arquitectura Modular en React:** Estructuración mediante componentes reutilizables (`Navbar`, `Home`, `ProductList`, `ProductCard`, `ShoppingCart`, `Contacto`, `Footer`).
- **Sistema de Ofertas y Descuentos:** 
  - Cálculo automático del porcentaje de descuento (`-X% OFF`).
  - Muestra del precio original junto al precio promocional en productos destacados.
  - Aplicación automática de la oferta dentro de los cálculos del carrito.
- **Carrito de Compras Interactivo:**
  - Contador de artículos en tiempo real sobre el botón del Navbar.
  - Modal interactivo con desglose en tabla (título del producto, precio unitario/oferta, cantidad y subtotal).
  - Control de cantidades, eliminación individual e integración de botones de acción.
  - Persistencia de datos mediante `localStorage` mediante hooks de efecto.
- **Buscador y Filtro por Categorías:**
  - Filtrado interactivo en tiempo real por categorías (Videojuegos, TCG, Accesorios).
  - Barra de búsqueda por texto directo para productos y categorías.
- **Diseño Responsivo y Tema Personalizado:**
  - Adaptación completa a móviles, tablets y computadoras mediante la grilla de **Bootstrap 5**.
  - Identidad visual propia utilizando variables CSS personalizadas.
- **Navegación Dinámica (SPA):** Transición entre secciones (Inicio, Catálogo, Contacto y scroll a Categorías) sin recargar la página.

---

## Tecnologías Utilizadas

- **React:** Biblioteca de JavaScript para la construcción de interfaces de usuario basadas en componentes.
- **Vite:** Entorno de desarrollo rápido y empaquetador de módulos.
- **JavaScript (ES6+):** Programación funcional, manipulación de arreglos y hooks.
- **Bootstrap 5 (CDN) & CSS3:** Sistema de maquetación responsiva, componentes UI y variables globales.
- **JSON:** Fuente de datos local para la carga de productos y gestión del catálogo.
- **LocalStorage API:** Persistencia del carrito de compras en el navegador del usuario.

---

## Estructura del Proyecto

```text
public/
└── img/                      # Imágenes de banners, carrusel y productos
src/
├── assets/
│   └── css/
│       └── estilos.css       # Estilos y variables personalizadas
├── components/
│   ├── Contacto.jsx          # Formulario y vista de contacto
│   ├── Footer.jsx            # Pie de página
│   ├── Home.jsx              # Vista principal con carrusel y destacados
│   ├── Navbar.jsx            # Barra de navegación con contador de carrito
│   ├── ProductCard.jsx       # Tarjeta individual con insignias de oferta
│   ├── ProductList.jsx       # Contenedor y grilla de productos
│   └── ShoppingCart.jsx      # Modal interactivo del carrito de compras
├── data/
│   └── productos.json        # Base de datos del catálogo
├── App.jsx                   # Componente principal y gestión de estados
└── main.jsx                  # Punto de entrada de React
```

---

## Despliegue

El proyecto se encuentra alojado y disponible en **GitHub Pages**:
`https://KatherineIbanezL.github.io/DESARROLLO-FRONTEND-I/`