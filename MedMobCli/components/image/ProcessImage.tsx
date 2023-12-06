import { IconButton } from "react-native-paper";
import { useAppDispatch } from "../../hooks";
import { ProcessedImage } from "../../domain/processedImage";
import { processedImageUpdated } from "../../store/processedImages";
import ImageAttribute from "../../domain/imageAttribute";

type SendImageToRobotProp = {
    img?: ProcessedImage
}

function SendImageToRobot(props: SendImageToRobotProp) {

    const dispatch = useAppDispatch();
    const sendImageToRobot = () => {
        if (props.img) {
            const dummyAttributes: ImageAttribute[] = [
                { name: 'chd', isPresent: true },
                { name: 'cbd', isPresent: true, details: [{ label: 'Diameter (mm):', value: "5" }] },
                { name: 'rahd', isPresent: true },
                { name: 'lhd', isPresent: true },
                { name: 'cysticDuct', isPresent: true },
                { name: 'duodenum', isPresent: true },
                { name: 'fillingDefects', isPresent: true, details: [{ label: 'Number present:', value: "5" }, { label: 'Size (mm):', value: "3" }] }]

            dispatch(processedImageUpdated({ id: props.img.id, changes: { attributes: dummyAttributes } }))
        }
    };

    return (
        props.img ? (
            <IconButton
                icon={"robot"}
                mode="contained"
                onPress={() => sendImageToRobot()} />
        ) : (null)
    );

}

export default SendImageToRobot;