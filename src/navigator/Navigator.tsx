import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {LoginScreen} from '../screens/LoginScreen';
import {RegisterScreen} from '../screens/Register';
import {ProtectedScreen} from '../screens/ProtectedScreen';
import {AuthContext} from '../context/AuthContext';
import {LoadingScreen} from '../screens/LoadingScreen';
import {UserTypeScreen} from '../screens/UserTypeScreen';
import {HomeScreen} from '../screens/HomeScreen';
import {AppointmentsNavigator} from './AppointmentsNavigator';
import {IndicesScreen} from '../screens/IndicesScreen';
import {SearchScreen} from '../screens/SearchScreen';
import {CitaScreen} from '../screens/CitaScreen';
import {EquivalenciaScreen} from '../screens/EquivalenciaScreen';
import {AvanceScreen} from '../screens/AvanceScreen';
import {NotasScreen} from '../screens/NotasScreen';
import { PatientRegisterScreen } from '../screens/PatientRegisterScreen';

const Stack = createStackNavigator();

export const MainNavigator = () => {
  const {status} = useContext(AuthContext);

  if (status === 'checking') return <LoadingScreen />;

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      {status !== 'authenticated' ? (
        <>
          {/* Fragmento para poder retornar alguna de las dos pantallas. 
            En una expresion ternaria solo se devueleve un objeto JSX */}
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="UserTypeScreen" component={UserTypeScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="PatientRegisterScreen" component={PatientRegisterScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="SearchSreen" component={SearchScreen} />
          <Stack.Screen name="IndicesScreen" component={IndicesScreen} />
          <Stack.Screen name="CitaScreen" component={CitaScreen} />
          <Stack.Screen name="EquivalenciaScreen" component={EquivalenciaScreen} />
          <Stack.Screen name="AvancesScreen" component={AvanceScreen} />
          <Stack.Screen name="NotasScreen" component={NotasScreen} />
          <Stack.Screen name="AppointmentsNavigator" component={AppointmentsNavigator}/>
          <Stack.Screen name="ProtectedScreen" component={ProtectedScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

// TODO Barra de busqueda
// TODO Conexion con servicio de nest js
