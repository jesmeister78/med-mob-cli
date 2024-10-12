import React from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';

import { useAppSelector, useAppDispatch } from '../../hooks';
import { RootState } from '../../store';
import { loginFailure, loginRequest, setEmail, setPassword } from '../../store/logins';

const LoginComponent: React.FC = () => {
    const dispatch = useAppDispatch();
    const { email, password, loading, error } = useAppSelector((state: RootState) => state.logins);
    const handleLogin = () => {
        if (email.trim() === '' || password.trim() === '') {
            dispatch(loginFailure('Please enter both email and password'));
        } else {
            dispatch(loginRequest());
            // Call your authentication API or service here 
            // If successful, dispatch loginSuccess() 
            // If failed, dispatch loginFailure(errorMessage) 
        }
    };
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Login</Text> {error ? <Text style={styles.error}>{error}</Text> : null}
            <TextInput style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={(text) => dispatch(setEmail(text))}
                autoCapitalize="none" keyboardType="email-address" />
            <TextInput style={styles.input}
                placeholder="Password" value={password}
                onChangeText={(text) => dispatch(setPassword(text))}
                secureTextEntry />
            <Button
                title="Login"
                onPress={handleLogin}
                disabled={loading} />
        </View>
    );
};  // ... (styles omitted for brevity)  export default LoginComponent;
const styles = StyleSheet.create(
    {
        container: { flex: 1, justifyContent: 'center', padding: 16, },
        heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, },
        input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 12, paddingHorizontal: 8, },
        error: { color: 'red', marginBottom: 12, },
    }
);

export default LoginComponent;