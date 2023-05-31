const Productos = require('./../models/ProductosCls');
const express = require('express');
const router = express.Router();
const objProductos = new Productos();

router.get('/', (req, res) => objProductos.listarProductos(req, res));
router.get('/:idProducto', (req, res) => objProductos.listarProductoPorId(req, res));
router.post('/', (req, res) => objProductos.registrarProducto(req, res));
router.delete('/:idProducto', (req, res) => objProductos.eliminarProductoPorId(req, res));

module.exports = router;