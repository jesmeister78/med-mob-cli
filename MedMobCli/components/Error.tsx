import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { clearError, selectError } from '../store/errors';
import { useAppDispatch, useAppSelector } from '../hooks';

const ErrorComponent: React.FC = () => {
  const error = useAppSelector(selectError);
  const dispatch = useAppDispatch();

  //if (!error) return null;

  const dismissError = () => {
    dispatch(clearError());
  };

  return error && (
    <View style={styles.container}>
      <Text style={styles.errorText}>{error}</Text>
      <TouchableOpacity onPress={dismissError} style={styles.dismissButton}>
        <Text style={styles.dismissText}>Dismiss</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    backgroundColor: '#FF6B6B',
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  errorText: {
    color: 'black',
    fontSize: 16,
    flex: 1,
  },
  dismissButton: {
    backgroundColor: '#4ECDC4',
    padding: 8,
    borderRadius: 4,
    marginLeft: 10,
  },
  dismissText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});

export default ErrorComponent;