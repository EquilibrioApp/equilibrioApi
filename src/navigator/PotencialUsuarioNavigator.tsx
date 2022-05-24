import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SearchDoctorByPC } from '../interfaces/appInterfaces';
import { PotentialUserScreen } from '../screens/PotentialUserScreen';
import { PotentialUserResultScreen } from '../screens/PotentialUserResultScreen';

export type PotencialUsuarioStackParams = {
    PotentialUserScreen: undefined,
    PotentialUserResultScreen: { doctor: SearchDoctorByPC }
  }


const Stack = createStackNavigator<PotencialUsuarioStackParams>();


export const PotencialUsuarioNavigator = () => {
  return (
        <Stack.Navigator
          screenOptions= {{ headerShown: false, }}
        >
          <Stack.Screen name="PotentialUserScreen" component={PotentialUserScreen} />
          <Stack.Screen name="PotentialUserResultScreen" component={PotentialUserResultScreen} />
        </Stack.Navigator>
  )
};