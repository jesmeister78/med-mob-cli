import { Text, TouchableOpacity, View } from "react-native";
import styles from "../styles";
import { Camera, useCameraDevice, useCameraDevices } from "react-native-vision-camera";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { GetImageProp } from "./props/getImageProps";



function CaptureImage(props: GetImageProp) {


    const camera = useRef<Camera>(null);
    const devices = useCameraDevices();
    console.log(devices);
    const device = useCameraDevice('back');

    const [showCamera, setShowCamera] = useState(true);

    useEffect(() => {
        async function getPermission() {
            const newCameraPermission = await Camera.requestCameraPermission();
            console.log("Camera permission: " + newCameraPermission);
        }
        getPermission();
    }, []);

    const capturePhoto = async () => {
        if (camera.current !== null) {
            const photo = await camera.current.takePhoto({});

            // close the camera
            setShowCamera(false);

            // add the image to the store
            if (props.setImage)
                props.setImage(photo.path)
            // close the component
            props.setVisible(false);

            console.log(photo.path);
        }
    };

    if (!props.show) return <View />;

    if (device == null) {
        return <Text>Camera not available</Text>;
    } else {
        return (
            <View style={styles.container}>
                <Camera
                    key={device.id} // add this
                    ref={camera}
                    style={styles.image}
                    device={device}
                    isActive={showCamera}
                    photo={true}
                    orientation="portrait"
                />

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.camButton}
                        onPress={() => capturePhoto()}
                    />
                </View>
            </View>

        );
    }

}

export default CaptureImage;