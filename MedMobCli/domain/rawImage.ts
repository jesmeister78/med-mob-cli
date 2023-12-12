export interface RawImage {
    id: string // uuidv4()
    procedureId?: string
    imageTimestamp: number
    //imageData: Uint8Array // this is the rendered image BEFORE processing
    rawImageSource: string
}