import { RawImage } from "./rawImage"

export interface Procedure {
    id: string // uuidv4()
    caseNumber: number
    patientName: string
    urIdentifier: string
    date: Date
    hospital: string
    surgeon: string

    /*
        Routine
        Suspected choledocholithiasis
        Deranged LFTs
        Pancreatitis
        Other (free text)
    */
    indication?: string

    images?: RawImage[]
}