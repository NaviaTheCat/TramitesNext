import { NextRequest, NextResponse } from "next/server";
import { getUsuarios, createUsuario,modificarUsuario, eliminarUsuario } from "@/app/lib/test/crudSQLServer";
// const sql = require('mssql');

export async function GET(request: NextRequest) {
    try {
        const { searchParams} = new URL(request.url);
        const nombreusuario = searchParams.get('nombreusuario') || undefined;
        if (!nombreusuario) {
            const usuarios = await getUsuarios();
            return NextResponse.json(usuarios);
        } else {
            const usuarios = await getUsuarios(nombreusuario);
            return NextResponse.json(usuarios);
        }
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        return NextResponse.json({ error: 'Error al obtener usuarios: ' + error }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const { nombre_usuario, correo_usuario, telefono_usuario, pass_usuario } = await request.json();
        if (!nombre_usuario || !correo_usuario || !telefono_usuario || !pass_usuario) {
            return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 });
        }
        await createUsuario(nombre_usuario, correo_usuario, telefono_usuario, pass_usuario);
        return NextResponse.json({ message: 'Usuario creado exitosamente' });
    } catch (error) {
        console.error('Error al crear usuario:', error);
        return NextResponse.json({ error: 'Error al crear usuario: ' + error }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const { id_usuario, nombre_usuario, correo_usuario, telefono_usuario, pass_usuario } = await request.json();
        if (!id_usuario || !nombre_usuario || !correo_usuario || !telefono_usuario || !pass_usuario) {
            return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 });
        }
        await modificarUsuario(id_usuario, nombre_usuario, correo_usuario, telefono_usuario, pass_usuario);
        return NextResponse.json({ message: 'Usuario modificado exitosamente' });
    } catch (error) {
        console.error('Error al modificar usuario:', error);
        return NextResponse.json({ error: 'Error al modificar usuario: ' + error }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { id_usuario } = await request.json();
        if (!id_usuario) {
            return NextResponse.json({ error: 'Falta el campo id_usuario' }, { status: 400 });
        }
        await eliminarUsuario(id_usuario);
        return NextResponse.json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        return NextResponse.json({ error: 'Error al eliminar usuario: ' + error }, { status: 500 });
    }
}