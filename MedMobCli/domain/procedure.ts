import { XraiImage } from "./xraiImage"

export interface Procedure {
    id: string // uuidv4()
    userId: string
    caseNumber: number
    patientName: string
    urIdentifier: string
    date: string
    hospital: string
    surgeon: string

    /*
        laparoscopic cholecystectomy; 
        open cholecystectomy; 
        other (free text) 
    */
    surgeryType: string

    /*
        Routine
        Suspected choledocholithiasis
        Deranged LFTs
        Pancreatitis
        Other (free text)
    */
    indication?: string

    defaultImageSource?: string
    images?: XraiImage[]
}