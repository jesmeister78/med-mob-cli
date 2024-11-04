import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import { useAppSelector, useAppDispatch } from '../../hooks';
import { RootState } from '../../store';
import { setError } from '../../store/errorSlice';
import { loginUser } from '../../store/userSlice';
import ErrorComponent from '../Error';
import { useNavigation } from '@react-navigation/native';
import { AuthScreenNavProp } from '../../screens/navigation/screenNavProps';
import UsernameValidator from './UserNameValidator';
import PasswordValidator from './PasswordValidator';
import { AuthMode } from '../../domain/constants/authMode';
import { Button } from 'react-native-paper';
import { Inputs } from '../../styles';

const LoginComponent: React.FC = () => {
    const dispatch = useAppDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const error = useAppSelector((state: RootState) => state.errors.message);
    const loading = useAppSelector((state: RootState) => state.user.loading)
    const navigation = useNavigation<AuthScreenNavProp>();
    const [isValidUser, setIsValidUser] = useState(false);
    const [isValidUsername, setIsValidUsername] = useState(false);
    const [isValidPassword, setIsValidPassword] = useState(false);

    // Add useEffect to update isValidUser whenever any validation state changes
    useEffect(() => {
        const isValid = isValidUsername && isValidPassword;
        console.log('Validation States:', {
            username: isValidUsername,
            password: isValidPassword,
            overall: isValid
        });
        setIsValidUser(isValid);
    }, [isValidUsername, isValidPassword]);
    
    const handleLogin = () => {
        if (username.trim() === '' || password.trim() === '') {
            dispatch(setError('Please enter both email and password'));
        } else {
            dispatch(loginUser({ username, password }));
            // Call your authentication API or service here 
            // If successful, dispatch loginSuccess() 
            // If failed, dispatch loginFailure(errorMessage) 
            navigation.navigate("Main");
        }
    };

    const updateValidUser = (isValid: boolean, isValidFunc: (val: boolean) => void) => {
        isValidFunc(isValid);
    };

    const handleUsernameChange = (text: string, isValid: boolean) => {
        setUsername(text);
        updateValidUser(isValid, setIsValidUsername);
        console.log("in login handleUsernameChange - isValid: " + isValid)
    };
    const handlePasswordChange = (text: string, isValid: boolean) => {
        setPassword(text);
        updateValidUser(isValid, setIsValidPassword);
        console.log("in login handlePasswordChange - isValid: " + isValid)
    };
    return (
        <>
            <ErrorComponent />

            <UsernameValidator onUsernameChange={handleUsernameChange} />
            <PasswordValidator mode={AuthMode.LOGIN} onPasswordChange={handlePasswordChange} />

            <Button
                style={styles.button}
                icon="lock"
                mode="elevated"
                onPress={handleLogin}
                disabled={!isValidUser}
            >
                Login
            </Button>
        </>

    );
};  // ... (styles omitted for brevity)  export default LoginComponent;
const styles = StyleSheet.create(
    {
        container: { flex: 1, justifyContent: 'center', padding: 16, },
        heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, },
        input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 12, paddingHorizontal: 8, },
        error: { color: 'red', marginBottom: 12, },
        textInput: {
            ...Inputs.form.text,
            marginVertical: 8,
        },
        button: {
            marginVertical: 8,
        },
    }
);

export default LoginComponent;