import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {clearToken, getToken} from '../services/tokenStorage';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../features/AuthStack/AuthContext';

const Home = () => {
  const { logout} = useAuth();
  const handleLogout = async () => {
    logout();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <TouchableOpacity onPress={handleLogout}>
        <View style={styles.logOutContainer}>
          <Text style={styles.logoutButton}>Logout</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  logOutContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'black',
    cursor: 'pointer',
    borderRadius: 5,
    color: 'white',
    elevation: 10,
  },
  logoutButton: {
    color: 'white',
  },
});
