This PR replaces the placeholder README with a concise description of the product being built: a full-stack app with a Node/Express/MySQL API and a React SPA frontend. It distinguishes project intent from the separate step-by-step manual that will be maintained in-repo.

- **Scope clarified**
  - Reframed README content around the application goals (Usuarios/Productos flow), not manual instructions.
  - Added a clear note that the implementation manual is documented separately.

- **Architecture snapshot**
  - Documented the target backend/frontend split and core stack:
    - Node.js, Express, MySQL (`mysql2`)
    - React (Vite), React Router

- **Current state and execution context**
  - Added a compact “estado actual” section describing immediate build-out targets (data modeling, CRUD, frontend integration).
  - Included expected dev runtime endpoints/commands for backend and frontend.

```md
## ¿Qué se está construyendo?
Una aplicación web con:
- **Backend** en Node.js + Express + MySQL (API REST).
- **Frontend** en React (SPA con navegación por rutas).
```

<!-- START COPILOT CODING AGENT SUFFIX -->



<!-- START COPILOT ORIGINAL PROMPT -->



<details>

<summary>Original prompt</summary>

Create a simple ReadMe about this project, the manual is the next one 

# Manual: Backend con Node/Express/MySQL + Frontend con React

Este manual documenta paso a paso cómo se armó el proyecto hasta el momento: un backend en Node.js/Express conectado a MySQL, y un frontend en React con navegación (Navbar + rutas).

---

## Estructura final del proyecto

```
practica-node/
├── backend/
│   ├── node_modules/
│   ├── src/
│   │   └── app.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
└── frontend/
    ├── node_modules/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   └── Navbar.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Usuarios.jsx
    │   │   └── Productos.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── package.json
    └── vite.config.js
```

---

## Parte 1: Backend (Node + Express + MySQL)

### 1. Crear la carpeta del proyecto y del backend

```bash
mkdir practica-node
cd practica-node
mkdir backend
cd backend
npm init -y
```

### 2. Instalar dependencias

```bash
npm install express mysql2 dotenv cors
npm install --save-dev nodemon
```

| Paquete | Uso |
|---|---|
| `express` | Framework para el servidor HTTP |
| `mysql2` | Driver para conectar con MySQL (soporta promesas) |
| `dotenv` | Cargar variables de entorno desde `.env` |
| `cors` | Permitir peticiones desde el frontend (otro puerto) |
| `nodemon` | Reinicia el servidor automáticamente al guardar cambios |

### 3. Crear el archivo `.env`

```
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=tienda_db
PORT=3000
```

### 4. Crear la base de datos en MySQL y el usuario con privilegios a esa BD

```sql
CREATE DATABASE tiendanode
    DEFAULT CHARACTER SET = 'utf8mb4';



CREATE USER 'usertiendanode'@'localhost' IDENTIFIED BY '123456';


GRANT ALL PRIVILEGES ON tiendanode.* TO 'usertiendanode'@'localhost';


SELECT user, host FROM mysql.user;


SHOW GRANTS FOR 'usertiendanode'@'localhost';
```

### 5. Crear `src/app.js` — configuración de Express

```javascript
// src/app.js
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.json({ mensaje: 'El servidor está funcionando 🚀' });
});

module.exports = app;
```

### 6. Crear `server.js` — punto de entrada, conecta a MySQL

```javascript
// server.js
require('dotenv').config();
const mysql = require('mysql2/promise');
const app = require('./src/app');

const PORT = process.env.PORT || 3000;

async function iniciarServidor() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    console.log('✅ Conectado a MySQL');
    await connection.end(); // solo probamos la conexión

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error al conectar a MySQL:', error.message);
  }
}

iniciarServidor();
```

### 7. Agregar scripts en `package.json`

```json
{
  "scripts": {
    "dev": "nodemon server.js",
    "start": "node server.js"
  }
}
```

### 8. Crear `.gitignore`

```
node_modules/
.env
```

### 9. Correr el servidor

```bash
npm run dev
```

Deberías ver en consola:
```
✅ Conectado a MySQL
🚀 Servidor corriendo en http://localhost:3000
```

### 10. Probar el endpoint

```bash
curl http://localhost:3000/api/health
```

Respuesta esperada:
```json
{ "mensaje": "El servidor está funcionando 🚀" }
```

**Nota importante:** todos los comandos del backend (`npm init`, `npm install`, `npm run dev`) deben ejecutarse **dentro de la carpeta `backend/`**. Si el `package.json` o `node_modules` terminan en la raíz del proyecto por error, hay que moverlos con `mv package.json backend/`, `mv node_modules backend/`, etc.

---

## Parte 2: Frontend (React con Vite)

### 1. Crear el proyecto con Vite

Desde la raíz del proyecto (`practica-node/`, **no** dentro de `backend/`):

```bash
cd practica-node
npm create vite@latest frontend -- --template react
```

Durante la instalación te preguntará:
- **Linter:** elegir `ESLint`
- **Lenguaje:** elegir `JavaScript`

### 2. Instalar dependencias

Este paso es indispensable: Vite genera el `package.json` del frontend, pero **no descarga las librerías** (React, ReactDOM, etc.) automáticamente.

```bash
cd frontend
npm install
```

### 3. Instalar React Router (para la navegación)

```bash
npm install react-router-dom
```

### 4. Crear el Navbar

```jsx
// src/components/Navbar.jsx
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={estilos.nav}>
      <h2 style={estilos.logo}>Mi App</h2>
      <ul style={estilos.lista}>
        <li><Link to="/" style={estilos.link}>Inicio</Link></li>
        <li><Link ...

</details>

