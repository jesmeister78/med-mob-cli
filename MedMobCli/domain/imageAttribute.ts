import ImageAttributeDetail from "./imageAttributeDetail";

type ImageAttribute = {
    name: string
    isPresent: boolean
    details?: ImageAttributeDetail[]
};

export default ImageAttribute;