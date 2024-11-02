import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectCurrentUser, userUpdated } from '../../store/userSlice';

interface EmailValidatorProps {
  onEmailChange?: (isValid: boolean) => void;
}

const EmailValidator: React.FC<EmailValidatorProps> = ({ onEmailChange }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);

  const [error, setError] = useState<string>('');

  const validateEmail = (text: string): boolean => {
    // Basic email regex pattern
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Additional common validation rules
    const maxLength: number = 254; // Maximum allowed email length
    const invalidChars: RegExp = /[()<>[\]\\,;:\s]/;
    
    // Clear previous error
    setError('');
    
    // Validation checks
    if (!text) {
      setError('Email is required');
      return false;
    }
    
    if (text.length > maxLength) {
      setError(`Email must be less than ${maxLength} characters`);
      return false;
    }
    
    if (invalidChars.test(text)) {
      setError('Email contains invalid characters');
      return false;
    }
    
    if (!emailRegex.test(text)) {
      setError('Please enter a valid email address');
      return false;
    }
    
    // Additional specific checks
    const [localPart, domain]: string[] = text.split('@');
    
    if (localPart.length > 64) {
      setError('Local part of email is too long');
      return false;
    }
    
    if (domain.length > 255) {
      setError('Domain name is too long');
      return false;
    }
    
    if (!/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(domain)) {
      setError('Invalid domain format');
      return false;
    }
    
    return true;
  };

  const handleEmailChange = (text: string): void => {
        user && dispatch(userUpdated({ id: user.id, changes: { email: text } }));
    const isValid: boolean = validateEmail(text);
    
    if (onEmailChange) {
      onEmailChange(isValid);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Email"
        value={user?.email}
        onChangeText={handleEmailChange}
        mode="outlined"
        keyboardType="email-address"
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

export default EmailValidator;