import { Dispatch, SetStateAction } from "react"

export type GetImageProp = {
    setShowCamera: Dispatch<SetStateAction<boolean>>
    setImage?: (imgSource: string) => void
}