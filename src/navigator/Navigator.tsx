import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {LoginScreen} from '../screens/LoginScreen';
import {RegisterScreen} from '../screens/Register';
import {ProtectedScreen} from '../screens/ProtectedScreen';
import {AuthContext} from '../context/AuthContext';
import {LoadingScreen} from '../screens/LoadingScreen';
import {UserTypeScreen} from '../screens/UserTypeScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { AppointmentsNavigator } from './AppointmentsNavigator';
import { PatientRegisterScreen } from '../screens/PatientRegisterScreen';
import { PatientsMainScreen } from '../screens/PatientsMainScreen';
import { BottomTab } from './BottomTab';
import { PotentialUserScreen } from '../screens/PotentialUserScreen';
import { PotentialUserResultScreen } from '../screens/PotentialUserResultScreen';
import { SearchDoctorByPC } from '../interfaces/appInterfaces';
import { PotencialUsuarioNavigator } from './PotencialUsuarioNavigator';




const Stack = createStackNavigator();

export const MainNavigator = () => {
  const { status } = useContext(AuthContext);

  const userType = AsyncStorage.getItem('userType');

  if (status === 'checking') return <LoadingScreen />;

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      {
        (status !== 'authenticated') 
          ? (
            <>
              {/* Fragmento para poder retornar alguna de las dos pantallas. 
                En una expresion ternaria solo se devueleve un objeto JSX*/}
              <Stack.Screen name="LoginScreen" component={LoginScreen} />
              <Stack.Screen name="UserTypeScreen" component={UserTypeScreen} />
              <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
              <Stack.Screen name="PatientRegisterScreen" component={PatientRegisterScreen} />
              <Stack.Screen name="PotencialUsuarioNavigator" component={PotencialUsuarioNavigator} />
            </>
          ) 
          : (
              <>
              <Stack.Screen name="PatientsMainScreen" component={BottomTab} />
              {/* <Stack.Screen name="AppointmentsNavigator" component={AppointmentsNavigator} /> */}
              <Stack.Screen name="ProtectedScreen" component={ProtectedScreen} />
              </>
          )
      }
    </Stack.Navigator>
  );
};
