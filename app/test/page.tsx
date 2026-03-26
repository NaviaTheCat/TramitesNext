"use client";
// Pägina para tests de API CRUD con SQL Server y stored procedures
import React, { useEffect, useState } from "react";

export default function TestPage() {
    const [usuarios, setUsuarios] = useState([]);
    const [idUsuario, setIdUsuario] = useState(0);
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [correoUsuario, setCorreoUsuario] = useState('');
    const [telefonoUsuario, setTelefonoUsuario] = useState('');
    const [passUsuario, setPassUsuario] = useState('');
    // Fetch Usuarios sera manual
    const fetchUsuarios = async () => {
        try {
            const response = await fetch('/api/usuarios');
            if (response.ok) {
                const data = await response.json();
                setUsuarios(data);
            }
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            alert('Error al obtener usuarios: ' + error);
        }
    }
    const crearUsuario = async () => {
        try {
            const response = await fetch('/api/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombre_usuario: nombreUsuario,
                    correo_usuario: correoUsuario,
                    telefono_usuario: telefonoUsuario,
                    pass_usuario: passUsuario
                })
            });
            if (response.ok) {
                const data = await response.json();
                alert('Usuario creado: ' + JSON.stringify(data));
                fetchUsuarios(); // Refrescar lista de usuarios
            }
        } catch (error) {
            console.error('Error al crear usuario:', error);
            alert('Error al crear usuario: ' + error);
        }
    }
    const modificarUsuario = async (id_usuario: number) => {
        try {
            const response = await fetch('/api/usuarios', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_usuario,
                    nombre_usuario: nombreUsuario,
                    correo_usuario: correoUsuario,
                    telefono_usuario: telefonoUsuario,
                    pass_usuario: passUsuario
                }),
            });
            if (response.ok) {
                const data = await response.json();
                alert('Usuario modificado: ' + JSON.stringify(data));
                fetchUsuarios(); // Refrescar lista de usuarios
            }
        } catch (error) {
            console.error('Error al modificar usuario:', error);
            alert('Error al modificar usuario: ' + error);
        }
    }
    const eliminarUsuario = async (id_usuario: number) => {
        try {
            const response = await fetch('/api/usuarios', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id_usuario }),
            });
            if (response.ok) {
                const data = await response.json();
                alert('Usuario eliminado: ' + JSON.stringify(data));
                fetchUsuarios(); // Refrescar lista de usuarios
            }
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
            alert('Error al eliminar usuario: ' + error);
        }
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Test API CRUD Usuarios</h1>
            <div className="mb-4">
                <input type="text" placeholder="ID Usuario (para modificar/eliminar)" value={idUsuario} onChange={(e) => setIdUsuario(Number(e.target.value))} className="border p-2 mr-2" />
                <input type="text" placeholder="Nombre Usuario" value={nombreUsuario} onChange={(e) => setNombreUsuario(e.target.value)} className="border p-2 mr-2" />
                <input type="email" placeholder="Correo Usuario" value={correoUsuario} onChange={(e) => setCorreoUsuario(e.target.value)} className="border p-2 mr-2" />
                <input type="text" placeholder="Teléfono Usuario" value={telefonoUsuario} onChange={(e) => setTelefonoUsuario(e.target.value)} className="border p-2 mr-2" />
                <input type="password" placeholder="Contraseña Usuario" value={passUsuario} onChange={(e) => setPassUsuario(e.target.value)} className="border p-2 mr-2" />
            </div>
            <div className="mb-4">
                <button onClick={fetchUsuarios} className="bg-blue-500 text-white px-4 py-2 mr-2">Obtener Usuarios</button>
                <button onClick={crearUsuario} className="bg-green-500 text-white px-4 py-2 mr-2">Crear Usuario</button>
                <button onClick={() => modificarUsuario(idUsuario)} className="bg-yellow-500 text-white px-4 py-2 mr-2">Modificar Usuario</button>
                <button onClick={() => eliminarUsuario(idUsuario)} className="bg-red-500 text-white px-4 py-2">Eliminar Usuario</button>
            </div>
            <div>
                <h2 className="text-xl font-bold mb-2">Usuarios:</h2>
                <pre className="bg-gray-100 p-4">{JSON.stringify(usuarios, null, 2)}</pre>
            </div>
        </div>
    )
}