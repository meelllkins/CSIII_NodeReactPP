# CSIII_NodeReactPP

🚀 Proyecto full-stack con Node.js, Express, MySQL y React — API REST con CRUD completo (Sequelize) + SPA con navegación, desarrollado paso a paso para la asignatura CSIII.

## Stack

**Backend**
- Node.js + Express
- MySQL (driver `mysql2`)
- Sequelize (ORM) + Sequelize CLI (migraciones)
- dotenv, cors, nodemon

**Frontend**
- React (Vite)
- React Router DOM

## Estructura del proyecto

CSIII_NodeReactPP/
├── backend/
│ ├── config/ # Configuración de Sequelize (lee del .env)
│ ├── controllers/ # Lógica del CRUD
│ ├── migrations/ # Migraciones de Sequelize
│ ├── models/ # Modelos: Usuario, Producto
│ ├── routes/ # Rutas de la API
│ ├── src/app.js # Configuración de Express
│ └── server.js # Punto de entrada
└── frontend/
└── src/
├── components/ # Navbar
└── pages/ # Home, Usuarios, Productos


## Modelo de datos

Un **Usuario** puede tener muchos **Productos** (relación uno a muchos).

## Requisitos previos

- Node.js
- MySQL Server corriendo localmente

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/TU_USUARIO/CSIII_NodeReactPP.git
cd CSIII_NodeReactPP
```

### 2. Backend

```bash
cd backend
npm install
```

Crea un archivo `.env` en `backend/` (usa `.env.example` como referencia):

DB_HOST=127.0.0.1
DB_USER=usertiendanode
DB_PASSWORD=123456
DB_NAME=tiendanode
PORT=3000


Crea la base de datos y el usuario en MySQL (puedes usar el script en la documentación del proyecto), y luego corre las migraciones:

```bash
npx sequelize-cli db:migrate
```

### 3. Frontend

```bash
cd ../frontend
npm install
```

## Cómo correr el proyecto

Se necesitan **dos terminales abiertas al mismo tiempo**:

| Terminal | Carpeta    | Comando       | URL                     |
|----------|------------|---------------|--------------------------|
| 1        | `backend/` | `npm run dev` | http://localhost:3000   |
| 2        | `frontend/`| `npm run dev` | http://localhost:5173   |

## Endpoints de la API

| Método | Ruta                  | Descripción                          |
|--------|-----------------------|---------------------------------------|
| GET    | `/api/health`          | Verifica que el servidor esté activo |
| GET    | `/api/usuarios`        | Lista todos los usuarios             |
| GET    | `/api/usuarios/:id`    | Obtiene un usuario (con sus productos)|
| POST   | `/api/usuarios`        | Crea un usuario                      |
| PUT    | `/api/usuarios/:id`    | Actualiza un usuario                 |
| DELETE | `/api/usuarios/:id`    | Elimina un usuario                   |
| GET    | `/api/productos`       | Lista todos los productos (con dueño)|
| GET    | `/api/productos/:id`   | Obtiene un producto                  |
| POST   | `/api/productos`       | Crea un producto                     |
| PUT    | `/api/productos/:id`   | Actualiza un producto                |
| DELETE | `/api/productos/:id`   | Elimina un producto                  |

## Autor

Elkin Palomino Castañeda
