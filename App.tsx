import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {MainNavigator} from './src/navigator/Navigator';
import {AuthProvider} from './src/context/AuthContext';
import {AppointmentsProvider} from './src/context/AppointmentsContext';
import {ExpedientesProvider} from './src/context/ExpedientesContext';

const AppState = ({children}: any) => {
  return (
    <AuthProvider>
      <ExpedientesProvider>
        <AppointmentsProvider>{children}</AppointmentsProvider>
      </ExpedientesProvider>
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
