'use client'

import { useState, useRef, useEffect } from 'react'
import { IoIosSend } from 'react-icons/io'

type AsistenteProps = {
  onClose: () => void
}

function Asistente({ onClose }: AsistenteProps) {
  const [mensaje, setMensaje] = useState('')
  const [cargando, setCargando] = useState(false)
  const [chat, setChat] = useState([
    { tipo: 'asistente', texto: 'Hola 👋 Soy tu asistente. Pregunta sobre trámites o documentos.' },
  ])

  const chatEndRef = useRef<HTMLDivElement>(null)

  // Auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chat])

  const enviarMensaje = async () => {
    if (!mensaje.trim() || cargando) return

    const mensajeUsuario = mensaje

    // Agregar mensaje usuario
    setChat((prev) => [...prev, { tipo: 'usuario', texto: mensajeUsuario }])
    setMensaje('')
    setCargando(true)

    try {
      const res = await fetch('http://127.0.0.1:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: mensajeUsuario }),
      })

      if (!res.ok) throw new Error('Error en la respuesta del servidor')

      const data = await res.json()
      data.answer =
        typeof data?.respuesta === 'string' && data.respuesta.trim()
          ? data.respuesta
          : data?.answer

      setChat((prev) => [
        ...prev,
        { tipo: 'asistente', texto: data.answer || 'Error al responder' },
      ])
    } catch (error) {
      setChat((prev) => [
        ...prev,
        { tipo: 'asistente', texto: 'Error al conectar con el servidor.' + (error instanceof Error ? error.message : '') },
      ])
    }

    setCargando(false)
  }

  return (
    <div className="h-full flex flex-col">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-3 md:mb-4">
        <h1 className="font-bold text-xs md:text-sm">Asistente RAG</h1>
        <button
          onClick={onClose}
          className="text-lg md:text-xl font-bold text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      {/* CHAT */}
      <div className="flex-1 overflow-y-auto bg-gray-50 p-3 md:p-4 rounded-lg mb-3 flex flex-col gap-2">
        {chat.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.tipo === 'usuario' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs p-2 rounded-lg text-xs md:text-sm ${msg.tipo === 'usuario'
                  ? 'bg-blue-500 text-white rounded-br-none'
                  : 'bg-gray-300 text-gray-800 rounded-bl-none'
                }`}
            >
              {msg.texto}
            </div>
          </div>
        ))}

        {/* Loader */}
        {cargando && (
          <div className="text-xs text-gray-500">Escribiendo...</div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* INPUT */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Pregunta sobre un trámite..."
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && enviarMensaje()}
          className="flex-1 border border-blue-300 rounded-lg p-2 text-xs md:text-sm focus:outline-none"
        />
        <button
          onClick={enviarMensaje}
          disabled={cargando}
          className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          <IoIosSend size="1.25rem" />
        </button>
      </div>
    </div>
  )
}

export default Asistente