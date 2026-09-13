const { Producto, Usuario } = require('../models');

// Obtener todos los productos (con su usuario dueño)
exports.obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll({
      include: { model: Usuario, as: 'usuario' }
    });
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un producto por id
exports.obtenerProductoPorId = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id, {
      include: { model: Usuario, as: 'usuario' }
    });
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un producto
exports.crearProducto = async (req, res) => {
  try {
    const { nombre, precio, usuarioId } = req.body;
    const nuevoProducto = await Producto.create({ nombre, precio, usuarioId });
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar un producto
exports.actualizarProducto = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
    const { nombre, precio, usuarioId } = req.body;
    await producto.update({ nombre, precio, usuarioId });
    res.json(producto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar un producto
exports.eliminarProducto = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
    await producto.destroy();
    res.json({ mensaje: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};