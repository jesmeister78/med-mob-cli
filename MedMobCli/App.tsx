/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState, useRef} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import {Camera, useCameraDevice, useCameraDevices} from 'react-native-vision-camera';

/*
  local imports
*/
import styles from './styles';

function App(){
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const camera = useRef<Camera>(null);
  const devices = useCameraDevices();
  console.log(devices);
  const device = useCameraDevice('back');

  const [showCamera, setShowCamera] = useState(false);
  const [imageSource, setImageSource] = useState('');

  useEffect(() => {
    async function getPermission() {
      const newCameraPermission = await Camera.requestCameraPermission();
      console.log(newCameraPermission);
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
  return (
    
    <View style={styles.container}>
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
            onPress={() => setShowCamera(true)}>
            <Text style={{color: 'black', fontWeight: '500'}}>Back</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.retakeButton}
              onPress={() => setShowCamera(true)}>
              <Text style={{color: '#77c3ec', fontWeight: '500'}}>
                Retake
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.retakeButton}
              onPress={() => setShowCamera(true)}>
              <Text style={{color: '#77c3ec', fontWeight: '500'}}>
                Save Image
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.usePhotoButton}
              onPress={() => setShowCamera(true)}>
              <Text style={{color: 'white', fontWeight: '500'}}>
                Process Image
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    )}
  </View>
  );
}


export default App;
