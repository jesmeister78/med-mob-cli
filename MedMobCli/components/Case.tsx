import { Button, Text, TouchableOpacity, View } from "react-native";
import { StackNavigation } from "../App";
import styles from "../styles";


interface CaseScreenProps {
  navigation: StackNavigation;
}

const HomeScreen: React.FC<CaseScreenProps>= ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Capture Image"
        onPress={() => navigation.navigate('Capture')}
      />
      <View style={styles.buttonContainer}>
          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.retakeButton}
              onPress={() => navigation.navigate('Capture')}>
              <Text style={{ color: '#77c3ec', fontWeight: '500' }}>
                Add New Image
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.retakeButton}
              onPress={() => navigation.navigate('Home')}>
              <Text style={{ color: '#77c3ec', fontWeight: '500' }}>
                Save Case
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.usePhotoButton}
              onPress={() => navigation.navigate('Home')}>
              <Text style={{ color: 'white', fontWeight: '500' }}>
                Edit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
    </View>
  );
}

export default HomeScreen;
