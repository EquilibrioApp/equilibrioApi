import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AppointmentsScreen } from '../screens/AppointmentsScreen';
import { AppointmentScreen } from '../screens/AppointmentScreen';

export type AppointmentsStackParams = {
    AppointmentsScreen: undefined,
                        //Parámetros que se utilizan en la pantalla
    AppointmentScreen: {idCita?: string, nombrePaciente?: string, correoPaciente?: string, inicio?: string, fin?: string}
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
            options={{title: 'Citas Agendadas'}}
          />
          <Stack.Screen
            name="AppointmentScreen"
            component={AppointmentScreen}
          />

        </Stack.Navigator>
  )
};
