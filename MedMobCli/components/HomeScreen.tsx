import { Button, Text, View } from "react-native";
import { StackNavigation } from "../App";


interface HomeScreenProps {
  navigation: StackNavigation;
}

const HomeScreen: React.FC<HomeScreenProps>= ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Capture Image"
        onPress={() => navigation.navigate('Capture')}
      />
      <Button
        title="Create/Edit Case"
        onPress={() => navigation.navigate('Case')}
      />
    </View>
  );
}

export default HomeScreen;
