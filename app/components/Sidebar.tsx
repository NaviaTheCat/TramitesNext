import Link from 'next/link'
import { FaHistory } from 'react-icons/fa'
import { FaCircleUser } from 'react-icons/fa6'
import { IoHome, IoClose } from 'react-icons/io5'
import { SiGoogledocs } from 'react-icons/si'

type SidebarProps = {
  isOpen: boolean
  onClose: () => void
}

function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      <div className="hidden md:block">
        <div className="bg-[#263E51] w-60 h-screen fixed top-0 left-0 z-50">
          <div>
            <div className="flex flex-col gap-y-2 text-white mx-10 pt-10">
              <FaCircleUser size="5rem" />
              <h1 className="text-xl font-semibold">Alumno</h1>
              <h2 className="text-lg">ARTURO DIAZ</h2>
            </div>
          </div>

          <div className="flex flex-col gap-y-2 mt-20 mx-5 text-white font-semibold">
            <Link href="/" className="flex items-center gap-x-4 p-3 rounded-lg hover:bg-gray-500">
              <IoHome size="2rem" />Dashboard
            </Link>
            <Link href="/catalogo" className="flex items-center gap-x-4 p-3 rounded-lg hover:bg-gray-500">
              <SiGoogledocs size="2rem" />Tramites
            </Link>
            <Link href="/mistramites" className="flex items-center gap-x-4 p-3 rounded-lg hover:bg-gray-500">
              <FaHistory size="2rem" />Mis tramites
            </Link>
          </div>
        </div>
      </div>

      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={onClose}></div>

          <div className="fixed left-0 top-0 h-screen w-60 bg-[#263E51] z-50 md:hidden shadow-lg animate-in slide-in-from-left">
            <div className="flex justify-between items-center p-5 border-b border-slate-500/60">
              <h1 className="text-white font-bold">Menu</h1>
              <button
                onClick={onClose}
                className="text-white text-2xl p-1 hover:bg-white hover:bg-opacity-20 rounded transition-all"
              >
                <IoClose />
              </button>
            </div>

            <div>
              <div className="flex flex-col gap-y-2 text-white mx-5 pt-8">
                <FaCircleUser size="3rem" />
                <h1 className="text-lg font-semibold">Alumno</h1>
                <h2 className="text-base">ARTURO DIAZ</h2>
              </div>
            </div>

            <div className="flex flex-col gap-y-2 mt-10 mx-3 text-white font-semibold">
              <Link
                href="/"
                onClick={onClose}
                className="flex items-center gap-x-4 p-3 rounded-lg hover:bg-white hover:bg-opacity-30"
              >
                <IoHome size="1.5rem" />
                <span className="text-sm">Dashboard</span>
              </Link>
              <Link
                href="/catalogo"
                onClick={onClose}
                className="flex items-center gap-x-4 p-3 rounded-lg hover:bg-white hover:bg-opacity-30"
              >
                <SiGoogledocs size="1.5rem" />
                <span className="text-sm">Tramites</span>
              </Link>
              <Link
                href="/mistramites"
                onClick={onClose}
                className="flex items-center gap-x-4 p-3 rounded-lg hover:bg-white hover:bg-opacity-30"
              >
                <FaHistory size="1.5rem" />
                <span className="text-sm">Mis tramites</span>
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Sidebar
