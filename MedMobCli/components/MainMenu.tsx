import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { CompositeNavigationProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { List, MD3Colors } from "react-native-paper";
import { MainBottomTabParamList } from "../screens/navigation/bottomTabParams";
import { RootStackParamList } from "../screens/navigation/rootStackParams";
import createNewProcedure from "../store/createNewProcedure";
import { useAppDispatch, useAppSelector } from "../hooks";
import { addProcedure } from "../store/procedureSlice";
import { StyleSheet, View } from 'react-native';
import ErrorComponent from "./Error";
import React from 'react';
import RegisterComponent from "./auth/Register";
import { AuthMode } from "../domain/constants/authMode";

type MainMenuNavProp = CompositeNavigationProp<
    StackNavigationProp<RootStackParamList, 'Main'>,
    BottomTabNavigationProp<MainBottomTabParamList, 'Home'>
>;

const MainMenuComponent: React.FC = () => {
    const navigation = useNavigation<MainMenuNavProp>();
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user.activeUsername)
    const createNewProcedureAndAddToStore = () => {
        const newProcedure = createNewProcedure();
        dispatch(addProcedure(newProcedure));
        navigation.navigate("ProcedureDetails", { procedureId: newProcedure.id });
    };

    const CenteredIcon = ({ icon }: { icon: string }) => (
        <View style={styles.iconContainer}>
            <List.Icon
                color={MD3Colors.tertiary70}
                icon={icon}
            />
        </View>
    );

    const LoginLogout = () => (
        user ? (
            <List.Item
                title="Logout"
                titleStyle={styles.centerText}
                left={() => <CenteredIcon icon="lock-open" />}
                onPress={() => navigation.navigate('Auth', {mode: AuthMode.LOGOUT})}
                style={styles.listItem}
            />) : (
            <List.Item
                title="Login"
                titleStyle={styles.centerText}
                left={() => <CenteredIcon icon="lock" />}
                onPress={() => navigation.navigate('Auth', {mode: AuthMode.LOGIN})}
                style={styles.listItem}
            />)
    );

    return (
        <>
            <ErrorComponent />
            <List.Section style={styles.section}>
                {user && <List.Subheader style={styles.subheaderText} >Welcome, {user}</List.Subheader>}
                {user &&
                    <>
                        <List.Item
                            title="Capture Image"
                            titleStyle={styles.centerText}
                            left={() => <CenteredIcon icon="camera" />}
                            onPress={() => navigation.navigate('Capture', {showCamera:true})}
                            style={styles.listItem}
                        />
                        <List.Item
                            title="Create New Procedure"
                            titleStyle={styles.centerText}
                            left={() => <CenteredIcon icon="plus" />}
                            onPress={() => createNewProcedureAndAddToStore()}
                            style={styles.listItem}
                        />
                        <List.Item
                            title="View Procedure List"
                            titleStyle={styles.centerText}
                            left={() => <CenteredIcon icon="clipboard" />}
                            onPress={() => navigation.navigate('ProcedureList', {})}
                            style={styles.listItem}
                        />
                    </>
                }
                <LoginLogout />
                {!user && 
                        <List.Item
                            title="Register"
                            titleStyle={styles.centerText}
                            left={() => <CenteredIcon icon="robot-happy" />}
                            onPress={() => navigation.navigate('Auth', {mode: AuthMode.REGISTER})}
                            style={styles.listItem}
                        />}
            </List.Section>
        </>

    );
};

const styles = StyleSheet.create({
    section: {
        paddingLeft: 20, // Added left padding to the entire section
    },
    centerText: {
        textAlign: 'center',
        flex: 1,
        marginLeft: -44,
        fontSize: 18, // Default is typically 12, increased by 50%
    },
    iconContainer: {
        width: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listItem: {
        paddingLeft: 0,
        height: 60, // Increased height to accommodate larger text and icons
    },
    subheaderText: {
        textAlign: 'center',
        marginLeft: -20, // This offsets the section's paddingLeft
        fontSize: 16,    // Adjust this value as needed
        marginBottom: 30
    },
});

export default MainMenuComponent;