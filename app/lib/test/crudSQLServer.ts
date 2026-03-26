const sql = require('mssql');

const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    server: '127.0.0.1',
    port: 1433,
    options: {
        encrypt: false, // Cambia a true si usas Azure SQL o necesitas cifrado
        trustServerCertificate: true, // Cambia a false en producción
    },
    connectionTimeout: 30000,     // sube a 30s por si acaso (en ms)
    requestTimeout: 30000
}
/**
 * Función para obtener clientes desde la base de datos SQL Server utilizando un stored procedure.
 * Nombre stored procedure: sp_obtener_usuarios
 * 
 */
export async function getUsuarios(nombreusuario?: string) {
    try {
        const pool = await sql.connect(sqlConfig);
        let result;
        if (nombreusuario) {
            result = await pool.request().input('nombreusuario', sql.VarChar, nombreusuario).execute('sp_obtener_usuarios');
        } else {
            result = await pool.request().execute('sp_obtener_usuarios');
        }
        return result.recordset;
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        throw new Error('Error al obtener usuarios: ' + error);
    }
}

/**
 * Nombre stored procedure: sp_insertar_usuario
 * @param nombre_usuario 
 * @param correo_usuario 
 * @param telefono_usuario 
 * @param pass_usuario 
 */

export async function createUsuario(nombre_usuario: string, correo_usuario: string, telefono_usuario: string, pass_usuario: string) {
    try {
        const pool = await sql.connect(sqlConfig);
        const result = await pool.request()
            .input('nombre_usuario', sql.VarChar, nombre_usuario)
            .input('correo_usuario', sql.VarChar, correo_usuario)
            .input('telefono_usuario', sql.VarChar, telefono_usuario)
            .input('pass_usuario', sql.VarChar, pass_usuario)
            .execute('sp_insertar_usuario');
        return result.recordset;
    } catch (error) {
        console.error('Error al crear usuario:', error);
        throw new Error('Error al crear usuario: ' + error);
    }
}

/**
 * Nombre stored procedure: sp_modificar_usuario
 * @param id_usuario 
 * @param nombre_usuario 
 * @param correo_usuario 
 * @param telefono_usuario 
 * @param pass_usuario 
 */
export async function modificarUsuario(id_usuario: number, nombre_usuario: string, correo_usuario: string, telefono_usuario: string, pass_usuario: string) {
    try {
        const pool = await sql.connect(sqlConfig);
        const result = await pool.request()
            .input('id_usuario', sql.Int, id_usuario)
            .input('nombre_usuario', sql.VarChar, nombre_usuario)
            .input('correo_usuario', sql.VarChar, correo_usuario)
            .input('telefono_usuario', sql.VarChar, telefono_usuario)
            .input('pass_usuario', sql.VarChar, pass_usuario)
            .execute('sp_modificar_usuario');
        return result.recordset;
    } catch (error) {
        console.error('Error al modificar usuario:', error);
        throw new Error('Error al modificar usuario: ' + error);
    }
}

/**
 * Nombre stored procedure: sp_eliminar_usuario
 * @param id_usuario 
 */
export async function eliminarUsuario(id_usuario: number) {
    try {
        const pool = await sql.connect(sqlConfig);
        const result = await pool.request()
            .input('id_usuario', sql.Int, id_usuario)
            .execute('sp_eliminar_usuario');
        return result.recordset;
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        throw new Error('Error al eliminar usuario: ' + error);
    }
}