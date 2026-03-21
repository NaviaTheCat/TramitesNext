'use client'

import { useState } from 'react'
import ButtonRag from '../components/ButtonRag'
import CardTramite from '../components/CardTramite'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

export default function CatalogoPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div>
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <h1 className="md:ml-80 ml-4 mt-20 text-lg md:text-xl font-bold px-2">
        Catalogo de tramites Universitarios
      </h1>

      <div className="md:ml-80 mt-8 px-4 md:px-0 md:pr-8">
        <input
          className="border border-slate-300 rounded-[20px] p-2 w-full focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
          placeholder="Buscar"
          type="text"
        />
      </div>

      <div className="md:ml-80 mt-8 mb-8 px-4 md:px-0 md:pr-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-max">
        <CardTramite />
        <CardTramite />
        <CardTramite />
        <CardTramite />
        <CardTramite />
        <CardTramite />
      </div>
      <ButtonRag />
    </div>
  )
}
