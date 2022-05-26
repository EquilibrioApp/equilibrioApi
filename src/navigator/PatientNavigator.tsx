import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {WaterMainScreen} from '../screens/WaterMainScreen';
import {ExcerciseMainScreen} from '../screens/ExcerciseMainScreen';
import {PotencialUsuarioNavigator} from './PotencialUsuarioNavigator';
import {SearchFoodNavigator} from './SearchFoodNavigator';
import {BottomTab} from './BottomTab';
import { RegisterPatScreen } from '../screens/RegisterPatScreen';
import { MetaAvancesScreen } from '../screens/MetasAvancesScreen';
import { NotificationScreen } from '../screens/NotificationScreen';
import { NotificationsScreen } from '../screens/NotificationsScreen';

export type PatientStackParams = {
  PatientsMainScreen: undefined;
  WaterRegister: undefined;
  ExcerciseRegister: {
    UserId: string;
  };
  PotencialUsuarioNavigator: undefined;
  SearchFoodNavigator: undefined;
  RegisterPatScreen: {
    UserId: string;
  };
  MetaAvancesScreen: {
    UserId: string;
  };
  NotificationsScreen: {
    userId: string | undefined;
  };
  NotificationScreen: {
    id_agenda?: string;
    idPaciente?: string;
    iCalUID?: string;
    start?: string;
    end?: string;
    correoPaciente?: string;
  };
};

const Stack = createStackNavigator<PatientStackParams>();

export const PatientNavigator = () => {
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
      <Stack.Screen name="PatientsMainScreen" component={BottomTab} options={{title: ''}}/>
      <Stack.Screen
        name="WaterRegister"
        component={WaterMainScreen}
        options={{title: 'Registro Agua'}}
      />
      <Stack.Screen
        name="ExcerciseRegister"
        component={ExcerciseMainScreen}
        options={{title: 'Ejercicio'}}
      />
      <Stack.Screen
        name="PotencialUsuarioNavigator"
        component={PotencialUsuarioNavigator}
        options={{title: 'Potencial Usuario'}}
      />
      <Stack.Screen
        name="RegisterPatScreen"
        component={RegisterPatScreen}
        options={{title: 'Registro'}}
      />
      <Stack.Screen
        name="SearchFoodNavigator"
        component={SearchFoodNavigator}
        options={{title: 'Recetas'}}
      />
      <Stack.Screen
        name="MetaAvancesScreen"
        component={MetaAvancesScreen}
        options={{title: 'Avances'}}
      />
      <Stack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{title: 'Notificacion'}}
      />
      <Stack.Screen
        name="NotificationsScreen"
        component={NotificationsScreen}
        options={{title: 'Notificaciones'}}
      />
      {/* <Stack.Screen name="PotentialUserResultScreen" component={PotentialUserResultScreen} /> */}
    </Stack.Navigator>
  );
};
