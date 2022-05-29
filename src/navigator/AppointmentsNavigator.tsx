import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AppointmentsScreen } from '../screens/AppointmentsScreen';
import { AppointmentScreen } from '../screens/AppointmentScreen';

export type AppointmentsStackParams = {
  //Parámetros que se utilizan en la pantalla
  AppointmentsScreen: {idEspecialista: string | undefined},
  AppointmentScreen: {id_agenda?: string, idPaciente?: string, idEspecialista?: string, iCalUID?: string, start: string, end?: string, correoEspecialista?: string, correoPaciente?: string}
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
