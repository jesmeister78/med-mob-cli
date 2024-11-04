import { StyleSheet, View } from "react-native";
import { List, MD3Colors } from "react-native-paper";

const CenteredIcon = ({ icon }: { icon: string }) => (
    <View style={styles.iconContainer}>
        <List.Icon
            color={MD3Colors.tertiary70}
            icon={icon}
        />
    </View>
);
const styles = StyleSheet.create({
    
    iconContainer: {
        width: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
   
});

export default CenteredIcon;