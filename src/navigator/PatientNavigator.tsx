import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {WaterMainScreen} from '../screens/WaterMainScreen';
import {ExcerciseMainScreen} from '../screens/ExcerciseMainScreen';
import {PotencialUsuarioNavigator} from './PotencialUsuarioNavigator';
import {SearchFoodNavigator} from './SearchFoodNavigator';
import {BottomTab} from './BottomTab';
import { RegisterPatScreen } from '../screens/RegisterPatScreen';

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
      <Stack.Screen name="PatientsMainScreen" component={BottomTab} />
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
      {/* <Stack.Screen name="PotentialUserResultScreen" component={PotentialUserResultScreen} /> */}
    </Stack.Navigator>
  );
};
