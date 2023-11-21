export interface RawImage {
    id: string // uuidv4()
    timestamp: Date
    data: Uint8Array // this is the rendered image BEFORE processing
}