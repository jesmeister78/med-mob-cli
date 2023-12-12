import { ImageStyle } from "react-native"


type Images = "thumbnail" | "processed" | "captured"

export const images: Record<Images, ImageStyle> = {
    thumbnail: {
        width: 80,
        height: 80,
        marginRight: 5,
    },
    processed: {},
    captured: {
        height: 500
    },
}