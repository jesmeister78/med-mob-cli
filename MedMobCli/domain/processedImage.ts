import { RawImage } from "./rawImage"

export interface ProcessedImage extends RawImage {
    processedDate: Date
    processorVersion: string // version of the ai model used to generate the processed image
    processedData: Uint8Array // this is the rendered image AFTER processing
}