import Link from 'next/link'
import { GiHamburgerMenu } from 'react-icons/gi'
import { IoExitOutline } from 'react-icons/io5'

type HeaderProps = {
  onMenuClick: () => void
}

function Header({ onMenuClick }: HeaderProps) {
  return (
    <div>
      <div className="bg-white border border-slate-200 fixed top-0 left-0 md:left-60 w-full md:w-[calc(100%-15rem)] h-16 flex items-center px-3 md:px-5 shadow-md z-40">
        <button
          onClick={onMenuClick}
          className="md:hidden text-2xl p-2 rounded-lg hover:bg-gray-100 transition-all"
        >
          <GiHamburgerMenu />
        </button>
        <div className="flex justify-end w-full gap-x-4 md:gap-x-16 items-center">
          <h1 className="flex items-center font-semibold text-sm md:text-base">Bienvenido ARTURO DIAZ</h1>
          <Link
            href="/login"
            className="flex items-center gap-x-2 md:gap-x-4 p-2 md:p-3 rounded-lg text-red-600 font-semibold text-sm md:text-base"
          >
            <IoExitOutline size="1.5rem" className="md:hidden" />
            <IoExitOutline size="2rem" className="hidden md:block" />
            <span className="hidden sm:inline">Cerrar Sesion</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Header
