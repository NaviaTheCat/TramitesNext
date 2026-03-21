'use client'

import Link from 'next/link'
import { useState } from 'react'
import ButtonRag from '../components/ButtonRag'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

export default function FormularioPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div>
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex justify-center items-center min-h-screen md:ml-60 pt-20 md:pt-0">
        <div className="w-full max-w-md bg-white p-6 md:p-10 rounded-lg shadow-lg border border-slate-200 mx-4 md:mx-0">
          <h1 className="text-lg md:text-xl font-semibold text-center mb-8 md:mb-10">
            Solicitar Documentacion
          </h1>

          <form className="space-y-4">
            <div className="flex flex-col space-y-4">
              <input
                className="border border-slate-300 p-2 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
                placeholder="Nombre Completo"
              />

              <input
                className="border border-slate-300 p-2 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
                placeholder="Matricula"
              />

              <input
                className="border border-slate-300 p-2 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
                placeholder="Carrera"
              />

              <select
                className="border border-slate-300 p-2 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
                defaultValue=""
              >
                <option value="" disabled>
                  Selecciona una opción de entrega
                </option>
                <option>1</option>
                <option>1</option>
              </select>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-between mt-6">
              <Link
                href="/catalogo"
                className="bg-red-600 p-3 text-white rounded-lg hover:bg-red-300 text-center flex-1 sm:flex-none"
              >
                Cancelar
              </Link>
              <Link
                href="/pago"
                className="bg-[#00fcfc] p-3 rounded-lg hover:bg-[#01abab] text-center flex-1 sm:flex-none"
              >
                Siguiente
              </Link>
            </div>
          </form>
        </div>
      </div>
      <ButtonRag />
    </div>
  )
}
