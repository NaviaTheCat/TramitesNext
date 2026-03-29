interface requisitosArchivos {
    identificadorArchivo: string
    nombreArchivo: string
    tituloRequisito: string
    descripcionRequisito: string
}

export interface tiposTramites {
    tituloTramite: string
    descripcionTramite: string
    costoTramite: string
    identificadorTramite: string
    requisitosTexto: string[]
    requisitosArchivos?: requisitosArchivos[]
}

export const listaTramitesDisponibles: tiposTramites[] = [
    {
        tituloTramite: 'Constancia de estudios',
        descripcionTramite: 'Documento oficial que certifica tu inscripción activa en la institución. Requiere que el estudiante presente su INE o documento de identidad vigente para verificar su identidad y estado académico.',
        costoTramite: '150$',
        identificadorTramite: 'constancia-estudios',
        requisitosTexto: [
            'INE o documento de identidad vigente',
        ],
        requisitosArchivos: [
            {
                identificadorArchivo: 'documento-identidad',
                nombreArchivo: 'Documento de identidad',
                tituloRequisito: 'Documento de identidad vigente',
                descripcionRequisito: 'INE'
            },
        ]
    },
    {
        tituloTramite: 'Carta de no adeudo',
        descripcionTramite: 'Documento que certifica que no tienes adeudos pendientes con la institución. Requiere que el estudiante presente su INE o documento de identidad vigente para verificar su identidad y estado académico.',
        costoTramite: '200$',
        identificadorTramite: 'carta-no-adeudo',
        requisitosTexto: [
            'CURP',
        ],
        requisitosArchivos: [
            {
                identificadorArchivo: 'curp',
                nombreArchivo: 'CURP',
                tituloRequisito: 'CURP',
                descripcionRequisito: 'CURP'
            },
        ]

    }
]