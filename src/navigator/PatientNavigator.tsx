import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { WaterMainScreen } from '../screens/WaterMainScreen';
import { ExcerciseMainScreen } from '../screens/ExcerciseMainScreen';


const Stack = createStackNavigator();


export const PatientNavigator = () => {
  return (
        <Stack.Navigator
          screenOptions= {{ headerShown: false, }}
        >
          <Stack.Screen name="WaterRegister" component={WaterMainScreen} />
          <Stack.Screen name="ExcerciseRegister" component={ExcerciseMainScreen} />
          {/* <Stack.Screen name="PotentialUserResultScreen" component={PotentialUserResultScreen} /> */}
        </Stack.Navigator>
  )
};