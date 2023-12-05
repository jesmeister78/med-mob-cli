import { Image } from "react-native";
import { ProcessedImage } from "../../domain/processedImage";


type ProcedureImagesProp = {
    procedureImages: ProcessedImage[]
}

function ProcedureImages(props: ProcedureImagesProp) {

    console.log('ProcedureImages::props.procedureImages.length: ' + props.procedureImages?.length)
    console.log('ProcedureImages::props.procedureImages[0].rawImageSource: ' + props.procedureImages[0]?.rawImageSource)
    // TODO: need to show more than just the first image
    return props.procedureImages && props.procedureImages.length > 0 ? (
        props.procedureImages.map(img => {
            const src = img.labelsImageSource ?? img.compositeImageSource ?? img.rawImageSource;
            return <Image key={img.id}
                style={{ width: 50, height: 50 }}
                source={{ uri: `file:///${src}` }}
                resizeMode={'cover'}
            />
        })
    ) : (null)
}

export default ProcedureImages;