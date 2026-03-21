'use client'

import Link from 'next/link'
import { useState } from 'react'
import ButtonRag from '../components/ButtonRag'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

export default function PagoPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div>
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex justify-center items-center min-h-screen md:ml-60 pt-20 md:pt-0">
        <div className="w-full max-w-md bg-white p-6 md:p-10 rounded-lg shadow-lg border border-slate-200 mx-4 md:mx-0">
          <h1 className="text-lg md:text-xl font-semibold text-center mb-8 md:mb-10">
            Datos de tarjeta
          </h1>

          <form className="space-y-4">
            <div className="flex flex-col space-y-4">
              <input
                className="border border-slate-300 p-2 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
                placeholder="Nombre Completo del titular"
              />

              <input
                className="border border-slate-300 p-2 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
                placeholder="Numero de tarjeta"
                type="number"
              />
              <div className="space-x-0 md:space-x-6 flex flex-col md:flex-row gap-2">
                <input
                  className="border border-slate-300 p-2 rounded-lg w-full md:w-[50%] focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
                  placeholder="Fecha Vencimiento"
                  type="date"
                />
                <input
                  className="border border-slate-300 p-2 rounded-lg w-full md:w-[40%] focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
                  placeholder="CVV"
                  type="number"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-between mt-6">
              <Link
                href="/formulario"
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
