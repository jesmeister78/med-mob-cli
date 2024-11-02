import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectCurrentUser, userUpdated } from '../../store/userSlice';

interface UsernameValidatorProps {
    onUsernameChange: (text:string, isValid: boolean) => void;
}

const UsernameValidator: React.FC<UsernameValidatorProps> = ({ onUsernameChange }) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectCurrentUser);

    const [error, setError] = useState<string>('');

    const validateUsername = (text: string): boolean => {

        // Additional common validation rules
        const minLength: number = 2;
        const maxLength: number = 254; // Maximum allowed username length
        const invalidChars: RegExp = /[()<>[\]\\,;:\s]/;

        // Clear previous error
        setError('');

        // Validation checks
        if (!text) {
            setError('Username is required');
            return false;
        }

        if (text.length < minLength) {
            setError(`Username must be at least ${minLength} characters`);
            return false;
        }

        if (text.length > maxLength) {
            setError(`Username must be less than ${maxLength} characters`);
            return false;
        }

        if (invalidChars.test(text)) {
            setError('Username contains invalid characters');
            return false;
        }

        return true;
    };

    const handleUsernameChange = (text: string): void => {
        user && dispatch(userUpdated({ id: user.id, changes: { username: text } }));
        const isValid: boolean = validateUsername(text);
        console.log('Username validation:', { text, isValid });

        if (onUsernameChange) {
            onUsernameChange(text, isValid);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                label="Username"
                value={user?.username}
                onChangeText={handleUsernameChange}
                mode="outlined"
                autoCapitalize="none"
                autoCorrect={false}
                error={!!error}
            />
            <HelperText type="error" visible={!!error}>
                {error}
            </HelperText>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
    },
});

export default UsernameValidator;