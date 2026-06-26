# Alcance del Proyecto

# AranguStock

Sistema web de gestión de catálogo e inventario desarrollado como challenge técnico para la posición de Software Engineer Web.

---

## Objetivo

El objetivo del proyecto es desarrollar una aplicación web funcional que permita gestionar un catálogo de productos e inventario mediante distintos niveles de acceso, demostrando conocimientos de:

* Desarrollo frontend.
* Desarrollo backend.
* Integración con bases de datos.
* Autenticación y autorización.
* Despliegue de aplicaciones.
* Uso de herramientas de Inteligencia Artificial.
* Buenas prácticas de ingeniería de software.

---

# Alcance del MVP

El sistema se enfocará en la gestión de productos e inventario, priorizando la solidez del software y la calidad de la experiencia de usuario por sobre la cantidad de funcionalidades.

---

# Roles del sistema

## Cliente

Usuarios no autenticados.

Permisos:

* Visualizar productos.
* Buscar productos.
* Ver promociones.
* Acceder al detalle de un producto.

---

## Empleado

Usuarios autenticados con permisos operativos.

Permisos:

* Visualizar stock.
* Modificar stock.
* Actualizar precios.
* Editar descripciones.

---

## Administrador

Usuarios con acceso total al sistema.

Permisos:

* Crear productos.
* Editar productos.
* Desactivar productos.
* Gestionar promociones.
* Administrar roles de usuarios.

---

# Pantallas del sistema

## Públicas

* Home.
* Catálogo de productos.
* Detalle del producto.
* Inicio de sesión y registro.

## Privadas

* Dashboard de empleados.
* Dashboard de administración.

---

# Funcionalidades incluidas

## Gestión de productos

* Alta de productos.
* Edición de productos.
* Baja lógica.
* Visualización del catálogo.

## Gestión de inventario

* Consulta de stock.
* Modificación de stock.

## Gestión de promociones

* Creación de promociones.
* Activación y desactivación.

## Búsqueda

* Búsqueda por nombre.

## Autenticación y autorización

* Registro.
* Inicio de sesión.
* Gestión de roles.

## Inteligencia Artificial

El sistema incorporará una funcionalidad asistida por IA que permitirá generar automáticamente descripciones de productos a partir de información básica proporcionada por el usuario.

---

# Funcionalidades fuera del alcance

Las siguientes características no forman parte del MVP:

* Carrito de compras.
* Órdenes de compra.
* Pasarelas de pago.
* Historial de pedidos.
* Notificaciones.
* Sistema de envíos.
* Gestión avanzada de usuarios.

---

# Tecnologías seleccionadas

## Frontend

* React.
* TypeScript.
* Tailwind CSS.

## Backend

* ASP.NET Core Web API.
* Entity Framework Core.

## Base de datos

* PostgreSQL (Supabase).

## Autenticación

* Supabase Auth.

## Inteligencia Artificial

* Gemini API.

## Despliegue

* Vercel (frontend).
* Render (backend).

---

# Objetivos técnicos

* Aplicación desplegada y funcional.
* Arquitectura desacoplada.
* API REST documentada.
* Control de acceso por roles.
* Uso de herramientas de IA durante el desarrollo.
* Repositorio documentado.
* Flujo de trabajo con Git.

---

# Criterios de calidad

* Código mantenible.
* Separación de responsabilidades.
* Validación de datos.
* Manejo de errores.
* Interfaces consistentes.
* Pruebas básicas del sistema.
* Documentación del proceso de desarrollo.

---

# Estado del proyecto

Documento de alcance inicial correspondiente al MVP del sistema.

Las funcionalidades aquí definidas representan el objetivo mínimo para la entrega final del challenge.
