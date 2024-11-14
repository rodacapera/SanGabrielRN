import {useNavigation} from '@react-navigation/native';
import {useEffect, useLayoutEffect} from 'react';
import {StackNavigation} from '../../../types/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {requestUserPermissionFb} from '@src/notifications/handlePushNotifications';

const SplashHook = () => {
  const navigation = useNavigation<StackNavigation>();

  const isLoged = async () => {
    const user = await AsyncStorage.getItem('Token');
    return user ?? null;
  };

  const checkUserStatus = async () => {
    const result = await isLoged();
    setTimeout(() => {
      result ? navigation.replace('Home') : navigation.replace('Login');
    }, 1000);
  };

  useLayoutEffect(() => {
    checkUserStatus();
  }, []);

  useEffect(() => {
    requestUserPermissionFb();
  }, []);

  return {};
};

export default SplashHook;
