import { RawImage } from "./rawImage"

export interface Procedure {
    id: string // uuidv4()
    caseNumber: number
    patientName: string
    urIdentifier: string
    date: string
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