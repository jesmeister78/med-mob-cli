import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Camera, useCameraDevice, useCameraDevices } from "react-native-vision-camera";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { GetImageProp } from "../props/getImageProps";
import { Surface } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Buttons, Containers } from "../../styles";

function CaptureImage(props: GetImageProp) {

    const camera = useRef<Camera>(null);
    const devices = useCameraDevices();
    console.log("CaptureImage::devices: " + devices);
    const device = useCameraDevice('back');
    const [cameraReady, setCameraReady] = useState(false);

    console.log("CaptureImage::cameraReady: " + cameraReady)
    // const [showCamera, setShowCamera] = useState(true);

    useEffect(() => {
        async function getPermission() {
            const newCameraPermission = await Camera.requestCameraPermission();
            setCameraReady(newCameraPermission === "granted")
            console.log("CaptureImage::Camera permission: " + newCameraPermission);
        }
        getPermission();
    }, []);

    const capturePhoto = async () => {
        if (camera.current !== null) {
            const photo = await camera.current.takePhoto({});
            console.log('CaptureImage::photo taken')
            // close the camera
            props.setShowCamera(false);

            // add the image to the store
            if (props.setImage)
                props.setImage(photo.path)
            // close the component
            props.setShowCamera(false);

            console.log(photo.path);
        }
    };

    if (device == null) {
        return <Text>Camera not available</Text>;
    } else {
        return (
            <SafeAreaView>
                <Surface>
                    <Camera
                        key={device.id} // add this
                        ref={camera}
                        style={styles.camera}
                        device={device}
                        isActive={cameraReady}
                        onInitialized={() => setCameraReady(true)}
                        photo={true}
                        orientation="portrait"
                    />
                    {
                        cameraReady ?
                            (
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity
                                        style={styles.camButton}
                                        onPress={() => capturePhoto()}
                                    />
                                </View>
                            ) : (null)
                    }
                </Surface>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    surface: { ...Containers.container.outerSurface },
    camButton: { ...Buttons.buttons.cam },
    buttonContainer: { ...Containers.container.camButton },
    camera: { width: 500, height: '100%' }
});

export default CaptureImage;