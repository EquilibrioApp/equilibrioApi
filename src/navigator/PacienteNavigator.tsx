import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {SearchScreen} from '../screens/SearchScreen';
import {IndicesScreen} from '../screens/IndicesScreen';
import {CitaScreen} from '../screens/CitaScreen';
import {EquivalenciaScreen} from '../screens/EquivalenciaScreen';
import {AvanceScreen} from '../screens/AvanceScreen';
import {NotasScreen} from '../screens/NotasScreen';
import {MenuExpedienteScreen} from '../screens/MenuExpedienteScreen';
import { RegisterPatScreen } from '../screens/RegisterPatScreen';

export type PacienteStackParams = {
  SearchScreen: undefined;
  RegisterPatScreen: {
    id?: string;
    nombre?: string;
    birthDate: Date;
    sexo?: string;
    alturaPaciente?: number;
    doctor?:string;
  };
};

const Stack = createStackNavigator<PacienteStackParams>();

export const PacienteNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: 'white',
        },
        headerStyle: {
          elevation: 0,
          shadowColor: 'transparent',
        },
      }}>
      <Stack.Screen
        name="RegisterPatScreen"
        component={RegisterPatScreen}
        options={{title: 'Registro'}}
      />
      
    </Stack.Navigator>
  );
};