import {StyleSheet} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../../Screens/Home';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ProfileScreen from '../../Screens/Profile';
import SettingsScreen from '../../Screens/Settings';

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

const MainStack = () => {
  return (
    // <Stack.Navigator screenOptions={{headerShown: false}}>
    //   <Stack.Screen name="Home" component={Home} />
    // </Stack.Navigator>

    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#f0f0f0', // Drawer background color
          width: 240, // Drawer width
        },
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: 'bold',
        },
        drawerActiveTintColor: '#6200ee', // Active item color
        drawerInactiveTintColor: '#222', // Inactive item color
      }}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
};

export default MainStack;

const styles = StyleSheet.create({});
