const pool = require('./../conexion');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('./../config');


class Auth {

    async checkUser(username) {
        // Consulta para contar la cantidad de usuarios con el mismo nombre de usuario
        let checkQuery = 'SELECT COUNT(*) AS count FROM usuarios WHERE username = ?';
        let checkUserResults = await pool.query(checkQuery, [username]);

        // Verificar si el conteo es mayor a cero (es decir, si el usuario ya existe)
        if (checkUserResults[0].count > 0) return true;

        return false;
    }

    async signUp(req, res) {
        // Obtener los datos de registro del cuerpo de la solicitud
        let { username, password, idRol } = req.body;

        // Generar el hash de la contraseña utilizando bcrypt
        let hashedPassword = bcrypt.hashSync(password, 10);

        // Consulta para insertar un nuevo usuario en la base de datos
        let insertQuery = 'INSERT INTO usuarios (username, password, idRol) VALUES (?, ?, ?)';

        try {
            // Verificar si el usuario ya existe llamando al método checkUser
            if (await this.checkUser(username)) {
                // El usuario ya existe, enviar una respuesta con el código de estado 409 (conflicto)
                return res.status(409).json({
                    mensaje: 'El usuario ya existe'
                });
            }

            // Ejecutar la consulta de inserción del nuevo usuario en la base de datos
            await pool.query(insertQuery, [username, hashedPassword, idRol]);

            // Consulta para obtener los datos del usuario recién insertado
            let selectQuery = 'SELECT * FROM usuarios WHERE username = ?';
            let savedUserResults = await pool.query(selectQuery, [username]);

            // Acceder a los datos del usuario recién insertado
            let savedUser = savedUserResults[0];

            console.log(savedUser);

            let token = jwt.sign({id: savedUser.idUsuario}, config.SECRET, {
                expiresIn: 86400
            });

            // Usuario registrado exitosamente, enviar una respuesta con el código de estado 201 (creado)
            res.status(201).json({
                mensaje: 'Usuario registrado exitosamente',
                token
            });

        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                // Error de duplicación de entrada (usuario ya existente), enviar una respuesta con el código de estado 409 (conflicto)
                return res.status(409).json({
                    error: 'El usuario ya existe'
                });
            } else {
                // Otro error no esperado, enviar una respuesta con el código de estado 500 (error interno del servidor)
                console.error('Error al registrar usuario:', error);
                return res.status(500).json({
                    error: 'Error al registrar usuario'
                });
            }
        }
    };
      

    validatePassword(clientPass, hashedPass){
        return bcrypt.compareSync(clientPass, hashedPass);
    }
    
    signIn(req, res) {
        res.send('signin');
    }

}

module.exports = Auth;