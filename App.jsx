import React from 'react';
import Route from './src/features/Routes/Route';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {SafeAreaView} from 'react-native';
import {AuthProvider} from './src/features/AuthStack/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Route />
    </AuthProvider>
    // <SafeAreaProvider>
    // {/* <SafeAreaView> */}
    // </SafeAreaView>
    // </SafeAreaProvider>
  );
};

export default App;
