import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import { useAppDispatch } from '../../hooks';
import { AuthMode } from '../../domain/constants/authMode';
import { Containers, Images, Inputs } from '../../styles';

interface PasswordValidatorProps {
    onPasswordChange: (text: string, isValid: boolean) => void;
    mode: AuthMode;
}

const PasswordValidator: React.FC<PasswordValidatorProps> = ({ onPasswordChange, mode }) => {
    const [error, setError] = useState<string>('');
    const dispatch = useAppDispatch();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [isValidConfirm, setIsValidConfirm] = useState(false);

    const validatePassword = (text: string): boolean => {

        // Additional common validation rules
        const minLength: number = 2;
        const maxLength: number = 254; // Maximum allowed password length
        const invalidChars: RegExp = /[()<>[\]\\,;:\s]/;

        // Clear previous error
        setError('');

        // Validation checks
        if (!text) {
            setError('Password is required');
            return false;
        }

        if (text.length < minLength) {
            setError(`Password must be at least ${minLength} characters`);
            return false;
        }

        if (text.length > maxLength) {
            setError(`Password must be less than ${maxLength} characters`);
            return false;
        }

        if (invalidChars.test(text)) {
            setError('Password contains invalid characters');
            return false;
        }

        return true;
    };

    const handlePasswordChange = (text: string) => {
        const isValid = validatePassword(text);
        console.log('Password validation:', { text, isValid });
        setPassword(text)
        setIsValidPassword(isValid)
        // Update confirm password validation when password changes
        const isConfirmValid = confirmPassword === text && isValid;
        setIsValidConfirm(isConfirmValid);
        onPasswordChange(text, isValid);
    };

    const handleConfirmPasswordChange = (text: string) => {
        const isValid = text === password && validatePassword(text);
        console.log('Confirm password validation:', { text, isValid });
        setConfirmPassword(text)
        setIsValidConfirm(isValid)
        onPasswordChange(text, isValid);
    };

    return (
        <>
            <TextInput
                label="Password"
                value={password}
                onChangeText={handlePasswordChange}
                secureTextEntry={!isPasswordVisible}
                error={!isValidPassword && password.length > 0}
                right={
                    <TextInput.Icon
                        icon={isPasswordVisible ? 'eye-off' : 'eye'}
                        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                    />
                }
                style={styles.textInput}
                autoCapitalize="none"
                autoCorrect={false}
            />
            <View style={styles.spacer} />

            {
                mode === AuthMode.REGISTER &&
                <TextInput
                    label="Confirm Password"
                    value={confirmPassword}
                    onChangeText={handleConfirmPasswordChange}
                    secureTextEntry={!isPasswordVisible}
                    error={!isValidConfirm && confirmPassword.length > 0}
                    right={
                        <TextInput.Icon
                            icon={isPasswordVisible ? 'eye-off' : 'eye'}
                            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                        />
                    }
                    style={styles.textInput}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            }
            <View style={styles.spacer} />
        </>

    );
};


const styles = StyleSheet.create({
    surface: { ...Containers.container.outerSurface, marginTop: 0 },
    spacer: { ...Containers.container.spacer },
    textInput: {
        ...Inputs.form.text,
        marginVertical: 8,
    },
    button: {
        marginVertical: 8,
    },
    procDateInput: { ...Inputs.form.datePicker },
    imgThumbnail: { ...Images.images.thumbnail },
    divider: { ...Containers.container.divider },
});

export default PasswordValidator;