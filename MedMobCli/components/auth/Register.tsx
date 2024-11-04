import { StyleSheet, View } from "react-native";
import { Containers, Images, Inputs } from "../../styles";
import { Button, Divider, Surface, Text, TextInput } from "react-native-paper";
import ErrorComponent from "../Error";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch, useAppSelector } from "../../hooks";
import { RootState } from "../../store";
import { registerUser, selectCurrentUser, userAdded } from "../../store/userSlice";
import { User } from "../../domain/user";
import EmailValidator from "./EmailValidator";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { AuthScreenNavProp } from "../../screens/navigation/screenNavProps";
import { AuthMode } from "../../domain/constants/authMode";
import PasswordValidator from "./PasswordValidator";
import UsernameValidator from "./UserNameValidator";
import { setError } from "../../store/errorSlice";

const RegisterComponent = () => {
    const user = useAppSelector(selectCurrentUser);
    const navigation = useNavigation<AuthScreenNavProp>();
    const dispatch = useAppDispatch();
    const error = useAppSelector((state: RootState) => state.errors.message);
    const [password, setPassword] = useState('');
    const [isValidUsername, setIsValidUsername] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [isValidUser, setIsValidUser] = useState(false);

    // Add useEffect to add an initial user to the redux state if there isn't one there
    useEffect(() => {
        if (!user) {
            const newUser = {
                "id": uuidv4(),
                "username": '',
                "email": '',
                "password": ''
            } as User;

            dispatch(userAdded(newUser));
        }
    }, [])

    // Add useEffect to update isValidUser whenever any validation state changes
    useEffect(() => {
        const isValid = isValidEmail && isValidUsername && isValidPassword;
        console.log('Validation States:', {
            email: isValidEmail,
            username: isValidUsername,
            password: isValidPassword,
            overall: isValid
        });
        setIsValidUser(isValid);
    }, [isValidEmail, isValidUsername, isValidPassword]);

    const handleRegister = async (): Promise<void> => {
        if (!user) {
            dispatch(setError("user does not exist"))
        }
        else {
            const newUser = {
                "id": user?.id,
                "username": user?.username,
                "email": user?.email,
                "password": password
            } as User;
            
            try {
                await dispatch(registerUser(newUser));
                // Use replace instead of navigate to prevent going back to register screen
                navigation.replace("Auth", { mode: AuthMode.LOGIN });
                console.log("Navigated to login screen");
            } catch (error) {
                console.error("Registration failed:", error);
                dispatch(setError("Registration failed"));
            }
        }
    }

    // const updateValidUser = (isValid: boolean, isValidFunc: (val: boolean) => void) => {
    //     isValidFunc(isValid);
    // };

    const handlePasswordChange = (text:string, isValid:boolean) => {
        setPassword(text);
        setIsValidPassword(isValid);
    };

    return (
        <>
            <ErrorComponent />
            <View style={styles.spacer} />

            <UsernameValidator onUsernameChange={(text, isValid) => setIsValidUsername(isValid)} />
            <EmailValidator onEmailChange={isValid => setIsValidEmail(isValid)} />
            <PasswordValidator mode={AuthMode.REGISTER} onPasswordChange={(text, isValid) => handlePasswordChange(text, isValid)} />

            <Button
                style={styles.button}
                icon="robot-happy"
                mode="elevated"
                onPress={handleRegister}
                disabled={!isValidUser}
            >
                Register
            </Button>
        </>
    );
};

const styles = StyleSheet.create({
    surface: { ...Containers.container.outerSurface, marginTop: 0 },
    spacer: { ...Containers.container.spacer },
    textInput: {
        ...Inputs.form.text,
    },
    button: {
        marginVertical: 8,
    },
    procDateInput: { ...Inputs.form.datePicker },
    imgThumbnail: { ...Images.images.thumbnail },
    divider: { ...Containers.container.divider },
});

export default RegisterComponent;