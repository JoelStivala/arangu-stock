# AranguStock

Sistema web de gestión de inventario y catálogo desarrollado como challenge técnico para AranguriApps.

AranguStock permite visualizar productos mediante un catálogo público y administrar el inventario a través de un panel protegido con autenticación y roles.

---

## Demo

Frontend: https://arangu-stock.vercel.app/

API: https://arangu-stock.onrender.com/api/

Documentación: https://arangu-stock.onrender.com/swagger/

---

## Características

### Catálogo público

* Visualización de productos activos.
* Búsqueda de productos.
* Página de detalle del producto.
* Visualización de imágenes almacenadas en Supabase Storage.
* Navegación responsive.

### Administración

* Login mediante Supabase Auth.
* Protección de rutas mediante JWT.
* Gestión de productos.
* Alta y modificación de categorías.
* Gestión de ofertas.
* Baja lógica y reactivación de productos.
* Control de acceso mediante roles.
* Generación automática de descripciones mediante IA.

### Seguridad

* Autenticación JWT.
* Validación de tokens emitidos por Supabase.
* Endpoints protegidos en ASP.NET Core.
* Autorización mediante roles almacenados en base de datos.

---

## Tecnologías utilizadas

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router
* Axios
* Supabase JS

### Backend

* ASP.NET Core Web API (.NET 10)
* Entity Framework Core
* JWT Bearer Authentication
* Repository Pattern
* Service Layer
* Google GenAI (Gemini)

### Base de datos

* PostgreSQL (Supabase)
* Supabase Auth
* Supabase Storage

### Infraestructura

* Docker
* Render
* Vercel

---

## Roles

### Administrador

* Gestión completa de productos.
* Gestión de categorías.
* Gestión de ofertas.
* Administración del catálogo.

### Empleado

* Gestión de productos.
* Activación y desactivación de productos.
* Actualización de stock e información.

---

## Estado del proyecto

✅ Backend funcional.

✅ Frontend funcional.

✅ Autenticación con Supabase.

✅ Autorización mediante roles.

✅ CRUD completo.

✅ Despliegue mediante Docker.

✅ Integración con Gemini para generación de descripciones.

---

## Próximas funcionalidades

* Sugerencias automáticas de contenido.
* Mejoras de UX/UI.
* Panel administrativo avanzado.

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
        ↓
Gemini API
```

---

## Objetivo

Este proyecto fue desarrollado como challenge técnico con el objetivo de demostrar conocimientos en:

* Desarrollo Full Stack.
* Arquitectura de APIs.
* Bases de datos.
* Autenticación y autorización.
* Contenedores Docker.
* Despliegue en la nube.
* Integración de servicios externos.

---

## Decisiones técnicas

Se eligió una arquitectura separada entre frontend y backend para facilitar el mantenimiento, el despliegue independiente de cada aplicación y la escalabilidad del proyecto.

* React + TypeScript fueron elegidos para desarrollar una interfaz moderna, tipada y mantenible.
* ASP.NET Core Web API se utilizó para implementar una API REST robusta y desacoplada.
* Entity Framework Core permitió acelerar el acceso a datos mediante un enfoque ORM.
* Supabase fue elegido por ofrecer PostgreSQL, autenticación y almacenamiento de archivos en una única plataforma.
* Docker se utilizó para garantizar la portabilidad del backend y facilitar el despliegue.
* Vercel y Render permitieron desplegar frontend y backend de forma independiente.
* Gemini fue integrado para asistir a los usuarios en la generación de descripciones de productos a partir de su título.

---

## Herramientas de IA utilizadas

Durante el desarrollo se utilizaron herramientas de inteligencia artificial como apoyo técnico y aceleración del desarrollo.

* ChatGPT fue utilizado para diseño de arquitectura, revisión de decisiones técnicas, generación de documentación y asistencia durante el desarrollo.
* OpenCode fue utilizado como agente de programación para acelerar la implementación de componentes, configuraciones y tareas repetitivas.
* Gemini fue integrado dentro de la aplicación para generar automáticamente descripciones de productos a partir de su título.

Las herramientas de IA fueron utilizadas como asistentes de desarrollo, manteniendo siempre la revisión y validación manual del código generado.

---

## Instalación y ejecución local

### Backend

```bash
cd backend
dotnet restore
dotnet run
```

Variables de entorno necesarias:

```env
CONNECTION_STRING=
SUPABASE_URL=
SUPABASE_JWKS_URL=
GEMINI_API_KEY=
```

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Variables de entorno necesarias:

```env
VITE_API_URL=
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
```

---

### Docker

También es posible ejecutar el backend mediante Docker:

```bash
docker build -t arangustock-api .
docker run -p 8080:8080 --env-file .env arangustock-api
```
