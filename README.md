# AranguStock

Sistema web de gestión de inventario y catálogo desarrollado como challenge técnico para AranguriApps.

AranguStock permite visualizar productos mediante un catálogo público y administrar el inventario a través de un panel protegido con autenticación y roles.

---

## Características

### Catálogo público

- Visualización de productos activos.
- Búsqueda de productos.
- Página de detalle del producto.
- Visualización de imágenes almacenadas en Supabase Storage.
- Navegación responsive.

### Administración

- Login mediante Supabase Auth.
- Protección de rutas mediante JWT.
- Gestión de productos.
- Alta y modificación de categorías.
- Gestión de ofertas.
- Baja lógica y reactivación de productos.
- Control de acceso mediante roles.

### Seguridad

- Autenticación JWT.
- Validación de tokens emitidos por Supabase.
- Endpoints protegidos en ASP.NET Core.
- Autorización basada en roles almacenados en base de datos.

---

## Tecnologías utilizadas

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios
- Supabase JS

### Backend

- ASP.NET Core Web API (.NET 10)
- Entity Framework Core
- JWT Bearer Authentication
- Repository Pattern
- Service Layer

### Base de datos

- PostgreSQL (Supabase)
- Supabase Auth
- Supabase Storage

### Infraestructura

- Docker
- Render
- Vercel

---

## Roles

### Administrador

- Gestión completa de productos.
- Gestión de categorías.
- Gestión de ofertas.
- Administración del catálogo.

### Empleado

- Gestión de productos.
- Activación y desactivación de productos.
- Actualización de stock e información.

---

## Estado del proyecto

✅ Backend funcional.

✅ Frontend funcional.

✅ Autenticación con Supabase.

✅ Autorización mediante roles.

✅ CRUD completo.

✅ Despliegue mediante Docker.

🚧 Integración con IA (próximamente).

---

## Próximas funcionalidades

- Generación asistida de descripciones mediante IA.
- Sugerencias automáticas de contenido.
- Mejoras de UX/UI.
- Panel administrativo avanzado.

---

## Arquitectura

```text
React + TypeScript
        ↓
ASP.NET Core Web API
        ↓
Entity Framework Core
        ↓
PostgreSQL (Supabase)
        ↓
Supabase Auth + Storage
```

---

## Objetivo

Este proyecto fue desarrollado como challenge técnico con el objetivo de demostrar conocimientos en:

- Desarrollo Full Stack.
- Arquitectura de APIs.
- Bases de datos.
- Autenticación y autorización.
- Contenedores Docker.
- Despliegue en la nube.
- Integración de servicios externos.