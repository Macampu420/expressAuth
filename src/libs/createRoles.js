const pool = require('./../conexion');

module.exports = async function(){

    try {
        let checkRoles = 'SELECT COUNT(*) FROM roles';
        let checkResults = await pool.query(checkRoles);
    
        if (checkResults[0]['COUNT(*)'] > 0) return;
    
        let insertRolesQuery = "INSERT INTO roles (tipoRol) VALUES ('Usuario'), ('Super Usuario');"
        let insertRolesResult = await pool.query(insertRolesQuery);
    
        console.log(insertRolesResult);    
    } catch (error) {
        console.log(error);
    }

}