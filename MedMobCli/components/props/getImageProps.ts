import { Dispatch, SetStateAction } from "react"

export type GetImageProp = {
    show: boolean
    setShowCamera: Dispatch<SetStateAction<boolean>>
    setImage?: (imgSource: string) => void
}