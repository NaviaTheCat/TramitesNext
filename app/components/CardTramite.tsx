import Link from 'next/link'
import { LuNotebookText } from 'react-icons/lu'
import { tiposTramites } from '../lib/tiposTramites/tiposTramites'

interface CardTramiteProps {
  tramite: tiposTramites
}

function CardTramite({ tramite }: CardTramiteProps) {
  return (
    <div className="w-full">
      <div className="bg-white rounded-lg shadow-lg p-4 md:p-5 border border-slate-200 h-full flex flex-col">
        <div className="flex space-x-3 md:space-x-4 mt-2 md:mt-3 mb-3">
          <div className="bg-white rounded-[70px] p-2 md:p-3 border border-slate-200 shrink-0">
            <LuNotebookText size="1.5rem" className="md:w-8 md:h-8" />
          </div>
          <h1 className="text-base md:text-xl font-semibold">{tramite.tituloTramite}</h1>
        </div>

        <p className="text-sm md:text-base grow">
          {tramite.descripcionTramite.length > 100 ? tramite.descripcionTramite.slice(0, 100) + '...' : tramite.descripcionTramite}
        </p>
        <div className="flex justify-between p-2 border border-slate-200 mt-5 mb-5 md:mb-10 rounded-lg">
          <p className="text-sm md:text-base">Costo</p>
          <p className="text-sm md:text-base">{tramite.costoTramite}</p>
        </div>
        <div className=''>
          <p className="text-sm md:text-base font-medium mb-2">Requisitos:</p>
          <ul className="list-disc list-inside text-sm md:text-base mb-4">
            {tramite.requisitosTexto.map((requisito, index) => (
              <li key={index}>{requisito}</li>
            ))}
          </ul>
        </div>
        <Link
          href={`/formulario/${tramite.identificadorTramite}`}
          className="bg-[#00FFFF] p-2 rounded-lg hover:bg-[#2fbdbd] text-center text-sm md:text-base font-medium w-full"
        >
          Solicitar
        </Link>
      </div>
    </div>
  )
}

export default CardTramite
