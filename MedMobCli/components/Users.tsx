import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Button
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { fetchUsers, selectAllUsers } from '../store/users';
import { useAppDispatch, useAppSelector } from '../hooks';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainBottomTabParamList } from '../screens/navigation/bottomTabParams';
import { RootStackParamList } from '../screens/navigation/rootStackParams';
import styles from '../styles';

type UsersScreenProps = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, 'Main'>,
  BottomTabNavigationProp<MainBottomTabParamList, 'Capture'>
>;

function UsersScreen() {
  const navigation = useNavigation<UsersScreenProps>();
  const { loading } = useAppSelector((state: RootState) => state.users);
  const dispatch = useAppDispatch();

  const users = useAppSelector(selectAllUsers);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <View>
      <Button title={'Reload'} onPress={() => dispatch(fetchUsers())} />
      {users.map((user) => {
        return (
          <View style={styles.container} key={user.id}>
            <View>
              <View >
                <Text>
                  {user.first_name} {user.last_name}
                </Text>
              </View>
              <View >
                <Text>{user.email}</Text>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default UsersScreen;

