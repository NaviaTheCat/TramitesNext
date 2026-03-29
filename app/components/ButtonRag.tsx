'use client'

import { useState } from 'react'
import { HiChatAlt2 } from 'react-icons/hi'
import Asistente from './Asistente'

function ButtonRag() {
  const [abierto, setAbierto] = useState(false)

  return (
    <div className="fixed z-10 bottom-4 md:bottom-10 right-4 md:right-10">
      {!abierto && (
        <button
        aria-label='Botón Para Abrir Ventana De Asistente'
          onClick={() => setAbierto(true)}
          className="bg-[#2CA2FD] shadow-lg text-white p-2 md:p-3 rounded-[90px] hover:bg-blue-500 transition-all cursor-pointer"
        >
          <HiChatAlt2 size="2rem" className="md:w-12 md:h-12" />
        </button>
      )}

      {abierto && (
        <div className="fixed bottom-4 md:bottom-10 right-4 md:right-10 w-90 md:w-150 bg-white rounded-lg shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
          <div className="p-3 md:p-4 h-100 md:h-145 overflow-hidden">
            <Asistente onClose={() => setAbierto(false)} />
          </div>
        </div>
      )}
    </div>
  )
}

export default ButtonRag
