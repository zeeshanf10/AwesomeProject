import {StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {clearToken, getToken} from '../../services/tokenStorage';
import SplashScreen from '../../Screens/SplashScreen';
import {NavigationContainer} from '@react-navigation/native';
import MainStack from '../MainStack/MainStack';
import AuthStack from '../AuthStack/AuthStack';

const Route = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null indicates checking state

  useEffect(() => {
    const checkToken = async () => {
      const token = await getToken();
      setIsAuthenticated(token);
    };

    checkToken();

  }, []);

  console.log('authh', isAuthenticated);

//     if (isAuthenticated === null) {
//   return  <SplashScreen />;

//     }

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Route;

const styles = StyleSheet.create({});
