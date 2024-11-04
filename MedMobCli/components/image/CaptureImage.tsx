import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
import { Image as XraiImage } from '../../domain/image';
import { useAppDispatch } from '../../hooks';
import { addImage } from '../../store/imageSlice';
import showCameraContext from '../../context/showCameraContext';
import { env } from '../../environment';
import ImageResizer from 'react-native-image-resizer';
import CameraRoll from '@react-native-camera-roll/camera-roll';

type CaptureImageProp = {
    setImage: (imgSource: string) => void;
};

function CaptureImage(props: CaptureImageProp) {
    const { setShowCamera } = useContext(showCameraContext);
    const dispatch = useAppDispatch();

    const camera = useRef<Camera>(null);
    const devices = useCameraDevices();
    console.log('CaptureImage::devices: ' + devices);
    const device = useCameraDevice('back');
    const format = useCameraFormat(device, [
        { photoAspectRatio: 1 }
    ]);
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
            try {
                const photo = await camera.current.takePhoto({
                    flash: 'off',
                    enableShutterSound: false,
                });
                
                // console.log('Original photo:', photo);
    
                // Since the original photo is landscape-right (rotated 90 degrees),
                // we need to swap width/height for our calculations
                const originalWidth = photo.height;  // 3024 in your case
                const originalHeight = photo.width;  // 3696 in your case
                
                // Calculate center crop coordinates
                const size = Math.min(originalWidth, originalHeight);
                const x = Math.floor((originalWidth - size) / 2);
                const y = Math.floor((originalHeight - size) / 2);
    
                // First do a center crop to get perfect square
                const croppedPhoto = await ImageResizer.createResizedImage(
                    Platform.OS === 'ios' ? `file://${photo.path}` : photo.path,
                    size,
                    size,
                    'JPEG',
                    100,
                    0,
                    undefined,
                    true,
                    {
                        mode: 'cover',
                    }
                );
    
                // Then resize the square photo to 300x300
                const finalPhoto = await ImageResizer.createResizedImage(
                    croppedPhoto.path,
                    300,
                    300,
                    'JPEG',
                    100,
                    0,
                    undefined,
                    true,
                    {
                        mode: 'cover'
                    }
                );
    
                // console.log('Final photo details:', finalPhoto);
    
                // Verify dimensions
                Image.getSize(finalPhoto.path, (width, height) => {
                    console.log('Final image dimensions:', width, height);
                }, (error) => {
                    console.error('Error getting image size:', error);
                });
    
                const sourcePath = Platform.OS === 'ios' 
                    ? finalPhoto.path 
                    : finalPhoto.path;
                
                createAndDispatchNewImage(sourcePath);
                setShowCamera(false);
    
            } catch (error) {
                console.error('Error in photo capture:', error);
            }
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
            compositeImageSource: defaultImgPath,
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
                <Surface style={styles.surface}>
                    <View style={styles.cameraContainer}>
                        <Camera
                            key={device.id}
                            ref={camera}
                            style={styles.camera}
                            device={device}
                            isActive={cameraReady}
                            onInitialized={() => setCameraReady(true)}
                            photo={true}
                            format={format}
                        />
                    </View>
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

// Update camera styles to ensure square preview
const styles = StyleSheet.create({
    surface: {
        ...Containers.container.outerSurface,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cameraContainer: {
        width: 300,
        height: 300,
        overflow: 'hidden',
        backgroundColor: 'black',
    },
    camera: {
        flex: 1,
        aspectRatio: 1,
    },
    camButton: {
        ...Buttons.buttons.cam
    },
    buttonContainer: {
        ...Containers.container.camButton,
        marginTop: 20,
    },
});

export default CaptureImage;