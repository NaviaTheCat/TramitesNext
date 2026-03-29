'use client'

import { useState, useRef, useEffect } from 'react'
import { IoIosSend } from 'react-icons/io'

type AsistenteProps = {
  onClose: () => void
}

type ChatMessage = {
  tipo: 'usuario' | 'asistente'
  texto: string
}

const CHAT_SESSION_STORAGE_KEY = 'asistente-rag-session-id'

const MENSAJE_BIENVENIDA: ChatMessage = {
  tipo: 'asistente',
  texto:
    'Hola 👋 Soy tu asistente de tramites universitarios. Si tienes alguna duda acerca de los procesos de trámites de control escolar, puedo ayudarte respondiendo tus preguntas.',
}

function getOrCreateSessionId() {
  const existing = localStorage.getItem(CHAT_SESSION_STORAGE_KEY)
  if (existing) {
    return existing
  }

  const newSessionId = crypto.randomUUID()
  localStorage.setItem(CHAT_SESSION_STORAGE_KEY, newSessionId)

  return newSessionId
}

function createNewSessionId() {
  const newSessionId = crypto.randomUUID()
  localStorage.setItem(CHAT_SESSION_STORAGE_KEY, newSessionId)
  return newSessionId
}

function Asistente({ onClose }: AsistenteProps) {
  const [mensaje, setMensaje] = useState('')
  const [cargando, setCargando] = useState(false)
  const [chat, setChat] = useState<ChatMessage[]>([MENSAJE_BIENVENIDA])
  const [sessionId, setSessionId] = useState<string | null>(null)

  const chatEndRef = useRef<HTMLDivElement>(null)
  const activeSessionRef = useRef<string | null>(null)

  const cargarHistorial = async (targetSessionId: string) => {
    try {
      const response = await fetch(
        `/api/rag/chat?sessionId=${encodeURIComponent(targetSessionId)}`
      )

      if (!response.ok) {
        throw new Error('No se pudo obtener historial')
      }

      const data = (await response.json()) as { messages?: ChatMessage[] }
      const messages = Array.isArray(data.messages) ? data.messages : []

      // Evita pisar el chat si cambió la sesión durante la petición.
      if (activeSessionRef.current !== targetSessionId) {
        return
      }

      if (messages.length > 0) {
        setChat(messages)
      } else {
        setChat([MENSAJE_BIENVENIDA])
      }
    } catch {
      if (activeSessionRef.current === targetSessionId) {
        setChat([MENSAJE_BIENVENIDA])
      }
    }
  }

  // Auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chat])

  useEffect(() => {
    const currentSessionId = getOrCreateSessionId()
    activeSessionRef.current = currentSessionId
    setSessionId(currentSessionId)
    cargarHistorial(currentSessionId)
  }, [])

  const iniciarNuevoChat = async () => {
    if (cargando) return

    const newSessionId = createNewSessionId()
    activeSessionRef.current = newSessionId
    setSessionId(newSessionId)
    setMensaje('')
    setChat([MENSAJE_BIENVENIDA])
    await cargarHistorial(newSessionId)
  }

  const enviarMensaje = async () => {
    if (!mensaje.trim() || cargando || !sessionId) return

    const mensajeUsuario = mensaje

    // Agregar mensaje usuario
    setChat((prev) => [...prev, { tipo: 'usuario', texto: mensajeUsuario }])
    setMensaje('')
    setCargando(true)

    try {
      const res = await fetch('/api/rag/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: mensajeUsuario, sessionId }),
      })

      const data = (await res.json()) as { answer?: string; error?: string }
      if (!res.ok) {
        throw new Error(data.answer || data.error || 'Error en la respuesta del servidor')
      }

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
        <div className="flex items-center gap-2">
          <button
            onClick={iniciarNuevoChat}
            disabled={cargando}
            className="rounded-lg border border-slate-300 px-2 py-1 text-[10px] md:text-xs text-slate-700 hover:bg-slate-100 disabled:opacity-50"
          >
            Nuevo chat
          </button>
          <button
            onClick={onClose}
            className="text-lg md:text-xl font-bold text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
      </div>
      <p className='text-sm'>Lógica de búsqueda y respuesta desarrollada por: Francisco Antonio Uc Pool. API desarrollada por: Roger Emanuel Santana Suaste</p>
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
          aria-label='Botón Para Envíar Mensaje Al Asistente'
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