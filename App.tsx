import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {MainNavigator} from './src/navigator/Navigator';
import {AuthProvider} from './src/context/AuthContext';
import {AppointmentsProvider} from './src/context/AppointmentsContext';

const AppState = ({children}: any) => {
  return (
    <AuthProvider>
      <AppointmentsProvider>
        {children}
      </AppointmentsProvider>
    </AuthProvider>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <MainNavigator />
      </AppState>
    </NavigationContainer>
  );
};

export default App;
