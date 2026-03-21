'use client'

import { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import ButtonRag from './components/ButtonRag'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import { FaUniversity, FaUser } from 'react-icons/fa'

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const events = [{ title: 'Meeting', start: new Date() }]

  return (
    <div>
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="md:ml-60 mt-16 p-4 md:p-8">
        <div className="flex flex-col lg:flex-row gap-4 md:gap-10 justify-center">
          <div className="bg-[#00CEEE] text-center p-6 md:p-20 rounded-lg shadow-lg w-full lg:w-[50%]">
            <div className="text-white ">
              <FaUser className="mx-auto mb-2" size="2.5rem" />
              <h1 className="text-2xl md:text-[30px] font-bold ">ARTURO DIAZ</h1>
              <p className="text-sm md:text-xl">INGENIERÍA EN DESARROLLO Y GESTIÓN DE SOFTWARE</p>
              <p className="text-sm md:text-xl">Matricula: 2289015</p>
            </div>
          </div>

          <div className="bg-[#14DCC5] p-6 md:p-20 rounded-lg shadow-lg text-center w-full lg:w-[50%]">
            <div className="text-white">
              <FaUniversity className="mx-auto mb-2" size="2.5rem" />
              <h1 className="text-2xl md:text-[30px] font-bold">IDYGS83</h1>
              <p className="text-sm md:text-xl">Edificio H - H119E</p>
              <p className="text-sm md:text-xl">Octavo cuatrimestre</p>
              <p className="text-sm md:text-xl">Tutor: PREZA MEDINA SERGIO ROBERTO</p>
            </div>
          </div>
        </div>
      </div>

      <div className="md:ml-60 px-4 md:px-10">
        <div className="p-2 overflow-x-auto">
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            weekends={true}
            events={events}
            eventContent={renderEventContent}
            headerToolbar={{
              left: 'title',
              right: 'today prev,next',
            }}
            height="auto"
            contentHeight="auto"
          />

          <ButtonRag />
        </div>
      </div>
    </div>
  )
}

function renderEventContent() {
  return <></>
}
