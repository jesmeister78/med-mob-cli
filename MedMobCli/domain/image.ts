import ClassMask from "./classMask"

export interface Image {
    
    id: string // uuidv4()
    imageTimestamp: string
    rawImageSource: string

    predictionImageSource?: string
    compositeImageSource?: string
    labelsImageSource?: string

    masks?: ClassMask[]
    procedureId?: string

}