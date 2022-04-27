import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {SearchScreen} from '../screens/SearchScreen';
import {IndicesScreen} from '../screens/IndicesScreen';
import {CitaScreen} from '../screens/CitaScreen';
import {EquivalenciaScreen} from '../screens/EquivalenciaScreen';
import {AvanceScreen} from '../screens/AvanceScreen';
import {NotasScreen} from '../screens/NotasScreen';

export type ExpedientesStackParams = {
  SearchScreen: undefined;
  IndicesScreen: {
    id?: string;
    nombre?: string;
    birthDate?: Date;
    sexo?: string;
    alturaPaciente?: number;
  };
  CitaScreen: {
    id?: string;
    nombre?: string;
    birthDate?: Date;
    sexo?: string;
    alturaPaciente?: number;
  };
  EquivalenciaScreen: {
    id?: string;
    nombre?: string;
    birthDate?: Date;
    sexo?: string;
    alturaPaciente?: number;
  };
  AvancesScreen: {
    id?: string;
    nombre?: string;
    birthDate?: Date;
    sexo?: string;
    alturaPaciente?: number;
  };
  NotasScreen: {
    id?: string;
    nombre?: string;
    birthDate?: Date;
    sexo?: string;
    alturaPaciente?: number;
  };
};

const Stack = createStackNavigator<ExpedientesStackParams>();

export const ExpedientesNavigator = () => {
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
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      {/* <Stack.Screen name="SearchScreen" component={SearchScreen} options={{title:'Expedientes'}}/> */}
      <Stack.Screen name="IndicesScreen" component={IndicesScreen} />
      <Stack.Screen name="CitaScreen" component={CitaScreen} />
      <Stack.Screen name="EquivalenciaScreen" component={EquivalenciaScreen} />
      <Stack.Screen name="AvancesScreen" component={AvanceScreen} />
      <Stack.Screen name="NotasScreen" component={NotasScreen} />
    </Stack.Navigator>
  );
};

{
  /* <Stack.Screen name="SearchSreen" component={SearchScreen} />
          <Stack.Screen name="IndicesScreen" component={IndicesScreen} />
          <Stack.Screen name="CitaScreen" component={CitaScreen} />
          <Stack.Screen
            name="EquivalenciaScreen"
            component={EquivalenciaScreen}
          />
          <Stack.Screen name="AvancesScreen" component={AvanceScreen} />
          <Stack.Screen name="NotasScreen" component={NotasScreen} />
          <Stack.Screen
            name="AppointmentsNavigator"
            component={AppointmentsNavigator}
          />
          <Stack.Screen name="ProtectedScreen" component={ProtectedScreen} />
        */
}
