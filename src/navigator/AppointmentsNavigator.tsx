import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AppointmentsScreen } from '../screens/AppointmentsScreen';
import { AppointmentScreen } from '../screens/AppointmentScreen';

export type AppointmentsStackParams = {
    AppointmentsScreen: undefined,
    AppointmentScreen: {id?: string, idPaciente?: string, inicio?: string, fin?: string}
}


const Stack = createStackNavigator<AppointmentsStackParams>();


export const AppointmentsNavigator = () => {
  return (
        <Stack.Navigator
          screenOptions= {{
            cardStyle: {
              backgroundColor: 'white'
            },
            headerStyle: {
              elevation: 0
            }
          }}
        >
          <Stack.Screen
            name="AppointmentsScreen"
            component={AppointmentsScreen}
            options={{title: 'Appointments'}}
          />
          <Stack.Screen
            name="AppointmentScreen"
            component={AppointmentScreen}
            options={{title: 'Appointment'}}
          />

        </Stack.Navigator>
  )
};
