import { RawImage } from "./rawImage.model"

export interface Case {
    id: string // uuidv4()
    caseNumber: number
    patientName: string
    urIdentifier: string
    date: Date
    surgeon: string
    indication: string
    images: RawImage[]

    // properties for testing
    name: string
    year: number
}