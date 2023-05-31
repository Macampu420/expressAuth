const pool = require('./../conexion.js');

class RutasProductos {

    async listarProductos(req, res) {
        try {
            let query = `SELECT * FROM PRODUCTOS`;

            let results = await pool.query(query);

            let productos = results.map(resultado => JSON.parse(JSON.stringify(resultado)));

            if(productos.length > 0) {
                res.status(200).json({resultados: productos});
            }else{
                res.status(204).end();
            }

        } catch (error) {
            console.log(error);
            res.status(500);
        }
    }

    async listarProductoPorId(req, res) {
        try {
            let idProducto = req.params.idProducto;
            let query = `SELECT * FROM PRODUCTOS WHERE idProducto = '${idProducto}'`;

            let results = await pool.query(query);
            let producto = results.map(resultado => JSON.parse(JSON.stringify(resultado)));

            if(producto.length > 0){
                res.status(200).json({resultados: producto});
            } else{
                res.status(204).end();
            }

        } catch (error) {
            console.log(error);
            res.status(500);
        }
    }

    async registrarProducto(req, res) {
        try {
            let { nombreProducto,categoriaProducto, precioProducto } = req.body;
            let query = `INSERT INTO productos(nombreProducto, categoriaProducto, precio) VALUES ('${nombreProducto}','${categoriaProducto}','${precioProducto}')`;

            let result = await pool.query(query);

            if (result.affectedRows === 1) {
                res.status(200).json({
                    mensaje: 'El producto se registró correctamente'
                });
            }

        } catch (error) {
            console.log(error);
            res.status(500).json({
                mensaje: 'Ocurrió un error al registrar el producto'
            });
        }
    }

    async eliminarProductoPorId(req, res) {
        try {
            const idProducto = req.params.idProducto;
            const query = `DELETE FROM PRODUCTOS WHERE idProducto = '${idProducto}'`;

            const result = await pool.query(query);

            if (result.affectedRows === 1) {
                res.status(200).json({
                    mensaje: 'El producto se eliminó correctamente'
                });
            } else {
                res.status(404).json({
                    mensaje: 'No se encontró el producto con el ID especificado'
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                mensaje: 'Ocurrió un error al eliminar el producto'
            });
        }
    }

}

module.exports = RutasProductos;