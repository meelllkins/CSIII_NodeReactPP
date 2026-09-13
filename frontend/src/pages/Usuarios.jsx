import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3000/api/usuarios';

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [editandoId, setEditandoId] = useState(null);

  // Se ejecuta una vez, al abrir la página
  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    const respuesta = await fetch(API_URL);
    const datos = await respuesta.json();
    setUsuarios(datos);
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();

    if (editandoId) {
      // Ya hay un usuario seleccionado para editar -> actualizar
      await fetch(`${API_URL}/${editandoId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email })
      });
    } else {
      // No hay nada seleccionado -> crear uno nuevo
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email })
      });
    }

    limpiarFormulario();
    cargarUsuarios();
  };

  const manejarEditar = (usuario) => {
    setEditandoId(usuario.id);
    setNombre(usuario.nombre);
    setEmail(usuario.email);
  };

  const manejarEliminar = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    cargarUsuarios();
  };

  const limpiarFormulario = () => {
    setEditandoId(null);
    setNombre('');
    setEmail('');
  };

  return (
    <div style={{ padding: '30px' }}>
      <h1>Usuarios</h1>

      <form onSubmit={manejarSubmit} style={estilos.form}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
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
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.nombre}</td>
              <td>{usuario.email}</td>
              <td>
                <button onClick={() => manejarEditar(usuario)}>Editar</button>
                <button onClick={() => manejarEliminar(usuario.id)}>Eliminar</button>
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

export default Usuarios;