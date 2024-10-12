import ClassMaskDetail from "./classMaskDetail";

type ClassMask = {
    code: string
    name: string
    colour: string
    show: boolean
    url: string
    details?: ClassMaskDetail[]
};

export default ClassMask;