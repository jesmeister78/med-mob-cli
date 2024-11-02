import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Surface } from 'react-native-paper';
import { userService } from '../../services/userService';
import RegisterComponent from '../../components/auth/Register';
import LoginComponent from '../../components/auth/Login';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AuthMode } from '../../domain/constants/authMode';
import { RootStackParamList } from '../navigation/rootStackParams';
import { Containers } from '../../styles';
import { clearTokenAsync } from '../../store/userSlice';

type AuthScreenProps = NativeStackScreenProps<RootStackParamList, 'Auth'>;

const AuthScreen: React.FC<AuthScreenProps> = ({ route, navigation }) => {
  const user = useAppSelector(state => state.user.activeUsername);
  const [mode, setMode] = useState(route.params?.mode || AuthMode.LOGIN);
  const dispatch = useAppDispatch();

  // Update mode when route params change
  useEffect(() => {
    if (route.params?.mode) {
      console.log('Route params mode changed:', route.params.mode);
      setMode(route.params.mode);
    }
  }, [route.params?.mode]);

  // Handle logout separately
  useEffect(() => {
    const handleLogout = async () => {
      try {
        if (user && mode === AuthMode.LOGOUT) {
          await dispatch(clearTokenAsync());
          console.log('Logout successful');
          // Use navigation.setParams instead of setMode
          navigation.setParams({ mode: AuthMode.LOGIN });
        }
      } catch (error) {
        console.error('Logout failed:', error);
      }
    };

    handleLogout();
  }, [user, mode, navigation]);

  // Determine which component to render based on current mode
  const renderAuthComponent = () => {
    console.log('Rendering auth component for mode:', mode);
    switch (mode) {
      case AuthMode.REGISTER:
        return <RegisterComponent />;
      case AuthMode.LOGIN:
        return <LoginComponent />;
      default:
        return <LoginComponent />;
    }
  };

  return (
    <Surface style={styles.surface}>
      {renderAuthComponent()}
    </Surface>
  );
};

const styles = StyleSheet.create({
  surface: { ...Containers.container.outerSurface },
});

export default AuthScreen;