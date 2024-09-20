import ImageAttributeDetail from "./imageAttributeDetail";

type ImageAttribute = {
    code: string
    name: string
    colour: string
    show: boolean
    url: string
    details?: ImageAttributeDetail[]
};

export default ImageAttribute;