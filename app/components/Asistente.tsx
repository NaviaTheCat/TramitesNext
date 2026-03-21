'use client'

import { useState } from 'react'
import { IoIosSend } from 'react-icons/io'

type AsistenteProps = {
  onClose: () => void
}

function Asistente({ onClose }: AsistenteProps) {
  const [mensaje, setMensaje] = useState('')
  const [chat, setChat] = useState([
    { tipo: 'usuario', texto: '¿Hola me ayudas con un trámite?' },
    {
      tipo: 'asistente',
      texto: 'Hola soy tu asistente, dime exactamente que trámite necesitas para ayudarte',
    },
  ])

  const enviarMensaje = () => {
    if (mensaje.trim()) {
      setChat([...chat, { tipo: 'usuario', texto: mensaje }])
      setMensaje('')
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-3 md:mb-4">
        <h1 className="font-bold text-xs md:text-sm">Pregunta al asistente</h1>
        <button
          onClick={onClose}
          className="text-lg md:text-xl font-bold text-gray-500 hover:text-gray-700 transition-all"
        >
          ✕
        </button>
      </div>

      <div className="flex-1 overflow-y-auto bg-gray-50 p-3 md:p-4 rounded-lg mb-3 md:mb-4 flex flex-col gap-2 md:gap-3">
        {chat.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.tipo === 'usuario' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs p-2 md:p-3 rounded-lg text-xs md:text-sm ${
                msg.tipo === 'usuario'
                  ? 'bg-blue-500 text-white rounded-br-none'
                  : 'bg-gray-300 text-gray-800 rounded-bl-none'
              }`}
            >
              {msg.texto}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enviar mensaje"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && enviarMensaje()}
          className="flex-1 border border-blue-300 rounded-lg p-2 text-xs md:text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
        <button
          onClick={enviarMensaje}
          className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-all"
        >
          <IoIosSend size="1.25rem" className="md:w-6 md:h-6" />
        </button>
      </div>
    </div>
  )
}

export default Asistente
