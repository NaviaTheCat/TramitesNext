'use client'

import { useState } from 'react'
import ButtonRag from '../components/ButtonRag'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

export default function MisTramitesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const estatus = 'En proceso'

  return (
    <div>
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <h1 className="text-center mt-20 md:ml-60 font-bold text-lg md:text-xl px-4">Seguimientos</h1>
      <div className="flex justify-center md:ml-60 mt-5 p-2 md:p-5 overflow-x-auto">
        <div className="w-full rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <table className="w-full text-sm md:text-base border-separate border-spacing-0">
            <thead className="bg-slate-50">
              <tr>
                <th className="p-3 border-b border-r border-slate-200 text-left font-semibold text-slate-700">Folio</th>
                <th className="p-3 border-b border-r border-slate-200 text-left font-semibold text-slate-700">Nombre del paquete</th>
                <th className="p-3 border-b border-r border-slate-200 text-left font-semibold text-slate-700">Fecha solicitada</th>
                <th className="p-3 border-b border-r border-slate-200 text-left font-semibold text-slate-700">Fecha de entrega</th>
                <th className="p-3 border-b border-r border-slate-200 text-left font-semibold text-slate-700">Estatus</th>
                <th className="p-3 border-b border-slate-200 text-center font-semibold text-slate-700">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="p-3 border-b border-r border-slate-200">1</td>
                <td className="p-3 border-b border-r border-slate-200">1</td>
                <td className="p-3 border-b border-r border-slate-200">1</td>
                <td className="p-3 border-b border-r border-slate-200">1</td>
                <td className="p-3 border-b border-r border-slate-200">
                  <p
                    className={`${
                      estatus === 'En proceso'
                        ? 'bg-yellow-300'
                        : estatus === 'Entregado'
                          ? 'bg-green-300'
                          : 'bg-red-300'
                    } p-1 text-center rounded-md text-xs md:text-sm`}
                  >
                    {estatus}
                  </p>
                </td>
                <td className="p-3 border-b border-slate-200 text-center">
                  <button className="inline-flex items-center bg-red-600 p-2 text-white rounded-md hover:bg-red-500 text-xs md:text-sm">
                    Borrar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <ButtonRag />
    </div>
  )
}
