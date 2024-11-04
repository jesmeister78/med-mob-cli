import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectCurrentUser, userUpdated } from '../../store/userSlice';

interface UsernameValidatorProps {
    onUsernameChange: (text: string, isValid: boolean) => void;
}

const UsernameValidator: React.FC<UsernameValidatorProps> = ({ onUsernameChange }) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectCurrentUser);
    const [error, setError] = useState<string>('');

    const validateUsername = (text: string): string => {
        const minLength: number = 2;
        const maxLength: number = 254;
        const invalidChars: RegExp = /[()<>[\]\\,;:\s]/;

        if (!text) {
            return 'Username is required';
        }

        if (text.length < minLength) {
            return `Username must be at least ${minLength} characters`;
        }

        if (text.length > maxLength) {
            return `Username must be less than ${maxLength} characters`;
        }

        if (invalidChars.test(text)) {
            return 'Username contains invalid characters';
        }

        return '';
    };

    // Validate username when component mounts or when user changes
    useEffect(() => {
        if (user?.username) {
            const error = validateUsername(user.username);
            setError(error);
            onUsernameChange(user.username, !error);
        }
    }, [user?.username]);

    const handleUsernameChange = (text: string): void => {
        if (user) {
            dispatch(userUpdated({ id: user.id, changes: { username: text } }));
        }
        const error = validateUsername(text);
        setError(error);
        onUsernameChange(text, !error);
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