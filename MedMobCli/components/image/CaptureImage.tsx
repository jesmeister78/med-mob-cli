import { Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
    Camera,
    useCameraDevice,
    useCameraDevices,
    useCameraFormat,
} from 'react-native-vision-camera';
import { useContext, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Surface } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Buttons, Containers } from '../../styles';
import { XraiImage } from '../../domain/xraiImage';
import { useAppDispatch } from '../../hooks';
import { addImage, xraiImageAdded } from '../../store/xraiImages';
import showCameraContext from '../../context/showCameraContext';
import { env } from '../../environment';

type CaptureImageProp = {
    setImage: (imgSource: string) => void;
};

function CaptureImage(props: CaptureImageProp) {
    const { setShowCamera } = useContext(showCameraContext);
    const dispatch = useAppDispatch();

    const camera = useRef<Camera>(null);
    const devices = useCameraDevices();
    console.log('CaptureImage::devices: ' + devices);
    const screen = Dimensions.get("screen");
    const device = useCameraDevice('back');
    const format = useCameraFormat(device, [
      {photoAspectRatio: screen.width/screen.width}
    ])
    const [cameraReady, setCameraReady] = useState(false);

    console.log('CaptureImage::cameraReady: ' + cameraReady);

    useEffect(() => {
        async function getPermission() {
            const newCameraPermission = await Camera.requestCameraPermission();
            setCameraReady(newCameraPermission === 'granted');
            console.log('CaptureImage::Camera permission: ' + newCameraPermission);
        }
        getPermission();
    }, []);

    const capturePhoto = async () => {
        if (camera.current !== null) {
            const photo = await camera.current.takePhoto({});
            console.log('CaptureImage::photo taken');

            // add the image to the store
            const sourcePath = Platform.OS === 'ios' ? photo.path.replace('file:///private', '') : photo.path;
            createAndDispatchNewImage(sourcePath);
            // close the component
            setShowCamera(false);

            console.log(photo.path);
        }
    };

    // create a new image to attach and add it to the store. we will remove it if the user hits retry
    const createAndDispatchNewImage = (src: string) => {
        const imageId = uuidv4();
        const defaultImgPath = env.XRAI_API_HOST + env.XRAI_API_DEFAULT_IMG;
        const now = new Date().toISOString();
        // create and dispatch the new image
        const img = {
            id: imageId,
            imageTimestamp: now,
            rawImageSource: src,
            compositeImageSource: defaultImgPath, //'http://172.20.10.2:5001/pizza_wait.gif',
            labelsImageSource: defaultImgPath,
            procedureId: undefined,
        } as XraiImage;
        dispatch(addImage(img));

        // set the image id in the parent screen so the ImageCapture component can use it
        props.setImage(imageId);
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
                        //orientation="portrait"
                        format={format}
                    />
                    {cameraReady ? (
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.camButton}
                                onPress={() => capturePhoto()}
                            />
                        </View>
                    ) : null}
                </Surface>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    surface: { ...Containers.container.outerSurface },
    camButton: { ...Buttons.buttons.cam },
    buttonContainer: { ...Containers.container.camButton },
    camera: { width: 400, height: 400 },
});

export default CaptureImage;
