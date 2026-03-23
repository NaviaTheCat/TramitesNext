'use client'

import Link from 'next/link'
import { use } from 'react'
import { useState, useEffect } from 'react'
import ButtonRag from '@/app/components/ButtonRag'
import Header from '@/app/components/Header'
import Sidebar from '@/app/components/Sidebar'
import { listaTramitesDisponibles } from '@/app/lib/tiposTramites/tiposTramites'

interface validationResponse {
  is_valid: boolean
  confidence: number
  issues: string[]
  qr_detected: boolean
}
interface respuestaAPI {
  tramite_id: string
  results: validationResponse[]
}

const listaCarreras = [
  'Ingeniería en Desarrollo y Gestión de Software',
  'Ingeniería en Mantenimiento Naval',
  'Licenciatura en Gastronomía',
  'Licenciatura en Terapia Física',
]

function encontrarTramitePorIdentificador(identificador: string) {
  return listaTramitesDisponibles.find(tramite => tramite.identificadorTramite === identificador)
}

export default function FormularioPage({
  params,
}: {
  params: Promise<{ identificadorTramite: string }>
}) {
  const slug = use(params).identificadorTramite;
  const tramite = encontrarTramitePorIdentificador(slug)
  const [erroresRequisitos, setErroresRequisitos] = useState<{ [key: string]: string }>({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [subiendoArchivos, setSubiendoArchivos] = useState(false);
  const [archivos, setArchivos] = useState<{ [key: string]: File | null }>(() => {
    const tramiteInicial = encontrarTramitePorIdentificador(slug)
    if (tramiteInicial && tramiteInicial.requisitosArchivos && tramiteInicial.requisitosArchivos.length > 0) {
      const archivosIniciales: { [key: string]: File | null } = {}
      tramiteInicial.requisitosArchivos.forEach((requisito) => {
        archivosIniciales[requisito.identificadorArchivo] = null
      })
      return archivosIniciales
    }
    return {}
  })
  const [formData, setFormData] = useState({
    nombreCompleto: '',
    matricula: '',
    carrera: '',
  })

  const handleEnviar = async () => {
    // Validar que se hayan llenado todos los campos requeridos
    if (!formData.nombreCompleto || !formData.matricula || !formData.carrera) {
      alert('Por favor, completa todos los campos requeridos.')
      return
    }
    const formDataParaEnviar = new FormData()
    if (tramite && tramite.requisitosArchivos) {
      const nuevosErrores: { [key: string]: string } = {}
      tramite.requisitosArchivos.forEach((requisito) => {
        if (!archivos[requisito.identificadorArchivo]) {
          nuevosErrores[requisito.identificadorArchivo] = `El archivo "${requisito.tituloRequisito}" es requerido.`
        }
      })
      setErroresRequisitos(nuevosErrores)
      if (Object.keys(nuevosErrores).length > 0) {
        return
      } else {
        // Primero se envian los archivos (si hay) para ser verificados, si la verificación falla, se cancela el guardar los datos (el tramite)
        setSubiendoArchivos(true)
        try {
          formDataParaEnviar.append('tramite_id', tramite.identificadorTramite);
          Object.entries(archivos).forEach(([identificador, file]) => {
            if (file) {
              formDataParaEnviar.append(`file_${identificador}`, file)
            }
          });
          const response = await fetch('http://127.0.0.1:8000/validate-documents', { // Cambiar por la API correcta una vez implementada.
            method: 'POST',
            body: formDataParaEnviar,
          });
          if (!response.ok) {
            const errorData = await response.json();
            alert(`Error en la validación de documentos: ${errorData.message}`);
            setSubiendoArchivos(false)
            return
          }
          const result = await response.json();
          if (result) {
            const validationSummary: respuestaAPI = result
            console.log('Resumen de validación:', validationSummary)
            // Aquí podrías mostrar un resumen de la valid
          }
        } catch (error) {
          console.error('Error al enviar los archivos:', error)
        }
      }
    }


  }

  if (!tramite || !slug) {
    return (
      <div>
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex justify-center items-center min-h-screen md:ml-60 pt-20 md:pt-0">
          <div className="w-full max-w-md bg-white p-6 md:p-10 rounded-lg shadow-lg border border-slate-200 mx-4 md:mx-0">
            <h1 className="text-lg md:text-xl font-semibold text-center mb-8 md:mb-10">
              Trámite no encontrado
            </h1>
            <p className="text-center text-sm md:text-base mb-6">
              El trámite que estás buscando no existe o no se ha especificado correctamente.
            </p>
            <Link
              href="/catalogo"
              className="bg-[#00fcfc] p-3 rounded-lg hover:bg-[#01abab] text-center text-sm md:text-base font-medium w-full"
            >
              Volver al Catálogo
            </Link>
          </div>
        </div>
        <ButtonRag />
      </div>
    )
  }

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
                value={formData.nombreCompleto}
                onChange={(e) => setFormData({ ...formData, nombreCompleto: e.target.value })}
              />

              <input
                className="border border-slate-300 p-2 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
                placeholder="Matricula"
                value={formData.matricula}
                onChange={(e) => setFormData({ ...formData, matricula: e.target.value })}
              />

              <select
                className="border border-slate-300 p-2 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
                defaultValue=""
                aria-label="Selecciona tu carrera"
                value={formData.carrera}
                onChange={(e) => setFormData({ ...formData, carrera: e.target.value })}
              >
                <option value="" disabled>
                  Selecciona tu carrera
                </option>
                {listaCarreras.map((carrera, index) => (
                  <option key={index} value={carrera}>
                    {carrera}
                  </option>
                ))}

              </select>
              {/* Archivos, se crea un input de tipo file para cada archivo requerido */}
              <div className='flex flex-col space-y-4'>
                {tramite.requisitosArchivos && tramite.requisitosArchivos.length > 0 && (
                  <div>
                    <p className="text-sm md:text-base font-medium mb-2">Archivos requeridos:</p>
                    <div className="flex flex-col space-y-4">
                      {tramite.requisitosArchivos.map((requisito) => (
                        <div key={requisito.identificadorArchivo} className="flex flex-col">
                          <label htmlFor={requisito.identificadorArchivo} className="text-sm md:text-base mb-1">
                            {requisito.tituloRequisito}
                          </label>
                          <input
                            type="file"
                            id={requisito.identificadorArchivo}
                            className="border border-slate-300 p-2 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
                            onChange={(e) => {
                              const file = e.target.files ? e.target.files[0] : null
                              setArchivos((prev) => ({ ...prev, [requisito.identificadorArchivo]: file }))
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-between mt-6">
              <Link
                href="/catalogo"
                className="bg-red-600 p-3 text-white rounded-lg hover:bg-red-300 text-center flex-1 sm:flex-none"
              >
                Cancelar
              </Link>
              <button
                className="bg-[#00fcfc] p-3 rounded-lg hover:bg-[#01abab] text-center text-sm md:text-base font-medium flex-1 sm:flex-none"
                disabled={subiendoArchivos}
                onClick={() => handleEnviar()}
              >
                {subiendoArchivos ? 'Enviando...' : 'Enviar Solicitud'}
              </button>
              {erroresRequisitos && Object.keys(erroresRequisitos).length > 0 && (
                <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                  <p className="font-medium mb-2">Errores en los requisitos:</p>
                  <ul className="list-disc list-inside text-sm md:text-base">
                    {Object.entries(erroresRequisitos).map(([identificador, error]) => (
                      <li key={identificador}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
      <ButtonRag />
    </div>
  )
}
