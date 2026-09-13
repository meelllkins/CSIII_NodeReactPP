import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3000/api/productos';
const USUARIOS_URL = 'http://localhost:3000/api/usuarios';

function Productos() {
  const [productos, setProductos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [usuarioId, setUsuarioId] = useState('');
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    cargarProductos();
    cargarUsuarios();
  }, []);

  const cargarProductos = async () => {
    const respuesta = await fetch(API_URL);
    const datos = await respuesta.json();
    setProductos(datos);
  };

  const cargarUsuarios = async () => {
    const respuesta = await fetch(USUARIOS_URL);
    const datos = await respuesta.json();
    setUsuarios(datos);
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();

    const cuerpo = {
      nombre,
      precio: parseFloat(precio),
      usuarioId: parseInt(usuarioId)
    };

    if (editandoId) {
      await fetch(`${API_URL}/${editandoId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cuerpo)
      });
    } else {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cuerpo)
      });
    }

    limpiarFormulario();
    cargarProductos();
  };

  const manejarEditar = (producto) => {
    setEditandoId(producto.id);
    setNombre(producto.nombre);
    setPrecio(producto.precio);
    setUsuarioId(producto.usuarioId);
  };

  const manejarEliminar = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    cargarProductos();
  };

  const limpiarFormulario = () => {
    setEditandoId(null);
    setNombre('');
    setPrecio('');
    setUsuarioId('');
  };

  return (
    <div style={{ padding: '30px' }}>
      <h1>Productos</h1>

      <form onSubmit={manejarSubmit} style={estilos.form}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="number"
          step="0.01"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          required
        />
        <select
          value={usuarioId}
          onChange={(e) => setUsuarioId(e.target.value)}
          required
        >
          <option value="">-- Selecciona un usuario --</option>
          {usuarios.map((usuario) => (
            <option key={usuario.id} value={usuario.id}>
              {usuario.nombre}
            </option>
          ))}
        </select>
        <button type="submit">{editandoId ? 'Actualizar' : 'Agregar'}</button>
        {editandoId && (
          <button type="button" onClick={limpiarFormulario}>Cancelar</button>
        )}
      </form>

      <table style={estilos.tabla}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Dueño</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.id}</td>
              <td>{producto.nombre}</td>
              <td>${producto.precio}</td>
              <td>{producto.usuario?.nombre || '—'}</td>
              <td>
                <button onClick={() => manejarEditar(producto)}>Editar</button>
                <button onClick={() => manejarEliminar(producto.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const estilos = {
  form: { display: 'flex', gap: '10px', marginBottom: '20px' },
  tabla: { width: '100%', borderCollapse: 'collapse' }
};

export default Productos;