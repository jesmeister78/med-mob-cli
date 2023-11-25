import { Dispatch, SetStateAction } from "react"

export type GetImageProp = {
    show: boolean
    setVisible: Dispatch<SetStateAction<boolean>>
    setImage?: (imgSource: string) => void
}