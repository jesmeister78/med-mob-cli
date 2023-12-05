import ImageAttribute from "./imageAttribute"
import { RawImage } from "./rawImage"

export interface ProcessedImage extends RawImage {
    processedDate?: string
    processorVersion?: string // version of the ai model used to generate the processed image

    // chd: ImageAttribute
    // cbd: ImageAttribute
    // rahd: ImageAttribute
    // lhd: ImageAttribute
    // cysticDuct: ImageAttribute
    // duodenum: ImageAttribute
    // fillingDefects: ImageAttribute

    attributes?: ImageAttribute[]

    compositeImageSource?: string
    labelsImageSource?: string

}