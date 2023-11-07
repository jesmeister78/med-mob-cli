export interface RawImage {
    id: string // uuidv4()
    dateCaptured: Date
    data: Uint8Array // this is the rendered image BEFORE processing
}