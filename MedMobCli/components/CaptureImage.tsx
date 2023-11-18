import { View, TouchableOpacity, Image, Text, useColorScheme } from "react-native";
import { Camera, useCameraDevice, useCameraDevices } from "react-native-vision-camera";
import styles from "../styles";
import { useRef, useState, useEffect } from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { StackNavigation } from "../App";

interface CaptureScreenProps {
  navigation: StackNavigation;
}

const CaptureImage: React.FC<CaptureScreenProps> =({ navigation }) =>{
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
  
    const camera = useRef<Camera>(null);
    const devices = useCameraDevices();
    console.log(devices);
    const device = useCameraDevice('back');
  
    const [showCamera, setShowCamera] = useState(true);
    const [imageSource, setImageSource] = useState('');
  
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
        setImageSource(photo.path);
        setShowCamera(false);
        console.log(photo.path);
      }
    };
  
    if (device == null) {
      return <Text>Camera not available</Text>;
    }
    return <View style={styles.container}>
    {showCamera ? (
      <>
        <Camera
          ref={camera}
          style={styles.image}
          device={device}
          isActive={showCamera}
          photo={true}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.camButton}
            onPress={() => capturePhoto()}
          />
        </View>
      </>
    ) : (
      <>
        {imageSource !== '' ? (
          <Image
            style={styles.image}
            source={{
              uri: `file://'${imageSource}`,
            }}
          />
        ) : null}

        <View style={styles.backButtonContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate('Home')}>
            <Text style={{ color: 'black', fontWeight: '500' }}>Go Home</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.retakeButton}
              onPress={() => setShowCamera(true)}>
              <Text style={{ color: '#77c3ec', fontWeight: '500' }}>
                Retake
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.retakeButton}
              onPress={() => setShowCamera(true)}>
              <Text style={{ color: '#77c3ec', fontWeight: '500' }}>
                Save Image
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.usePhotoButton}
              onPress={() => setShowCamera(true)}>
              <Text style={{ color: 'white', fontWeight: '500' }}>
                Process Image
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    )}
  </View>
}

export default CaptureImage;