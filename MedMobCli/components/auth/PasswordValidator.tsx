import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
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
        const minLength: number = 2;
        const maxLength: number = 254;

        setError('');

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

        return true;
    };

    // Use useEffect to handle validation state changes
    useEffect(() => {
        const isValid = mode === AuthMode.REGISTER ? 
            isValidPassword && isValidConfirm : 
            isValidPassword;
            
        onPasswordChange(password, isValid);
    }, [isValidPassword, isValidConfirm, password, mode]);

    const handlePasswordChange = (text: string) => {
        const isValid = validatePassword(text);
        setPassword(text);
        setIsValidPassword(isValid);
        
        // Update confirm password validation when password changes
        if (mode === AuthMode.REGISTER) {
            const isConfirmValid = confirmPassword === text && isValid;
            setIsValidConfirm(isConfirmValid);
        }
    };

    const handleConfirmPasswordChange = (text: string) => {
        const isValid = text === password && validatePassword(text);
        setConfirmPassword(text);
        setIsValidConfirm(isValid);
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

            {mode === AuthMode.REGISTER && (
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
            )}
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