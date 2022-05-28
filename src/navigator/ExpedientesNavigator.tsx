import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {SearchScreen} from '../screens/SearchScreen';
import {IndicesScreen} from '../screens/IndicesScreen';
import {CitaScreen} from '../screens/CitaScreen';
import {EquivalenciaScreen} from '../screens/EquivalenciaScreen';
import {AvanceScreen} from '../screens/AvanceScreen';
import {NotasScreen} from '../screens/NotasScreen';
import {MenuExpedienteScreen} from '../screens/MenuExpedienteScreen';
import { SearchPatientScreen } from '../screens/SearchPatientScreen';

export type ExpedientesStackParams = {
  SearchScreen: undefined;
  SearchPatientScreen: undefined;
  MenuExpedienteScreen: {
    id: string;
    nombre?: string;
    birthDate: Date;
    sexo?: string;
    alturaPaciente?: number;
    doctor?:string;
  };
  IndicesScreen: {
    id: string | undefined
  };
  EquivalenciaScreen: {
    id: string | undefined
  };
  AvancesScreen: {
    id: string,
  };
  NotasScreen: {
    id: string | undefined
  };
  // CitaScreen: {
  //   id?: string;
  //   exercises?: string, expediente?: string
  // };
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
      <Stack.Screen name="SearchScreen" component={SearchScreen} options={{title: 'Expedientes'}}/>
      <Stack.Screen name="SearchPatientScreen" component={SearchPatientScreen} options={{title: 'Expedientes'}}/>
      <Stack.Screen name="MenuExpedienteScreen" component={MenuExpedienteScreen} options={{title: 'Menu'}}/>
      <Stack.Screen name="IndicesScreen" component={IndicesScreen} options={{title: 'Indices'}}/>
      <Stack.Screen name="EquivalenciaScreen" component={EquivalenciaScreen} options={{title: 'Equivalencia'}}/>
      <Stack.Screen name="AvancesScreen" component={AvanceScreen} options={{title: 'AvancesVsMeta'}}/>
      <Stack.Screen name="NotasScreen" component={NotasScreen} options={{title: 'Notas'}}/>
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
