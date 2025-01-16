import React from 'react';
import Route from './src/features/Routes/Route';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {SafeAreaView} from 'react-native';
import {AuthProvider} from './src/features/AuthStack/AuthContext';
import {store} from './src/services/reduxStore';
import {Provider} from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        {/* <SafeAreaView> */}
          <AuthProvider>
            <Route />
          </AuthProvider>
        {/* </SafeAreaView> */}
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
