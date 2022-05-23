import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AppointmentsScreen } from '../screens/AppointmentsScreen';
import { AppointmentScreen } from '../screens/AppointmentScreen';
import { DoctorsSettingsScreen } from '../screens/DoctorsSettingsScreen';
import { DoctorProfileScreen } from '../screens/DoctorProfileScreen';

// export type AppointmentsStackParams = {
//   //Parámetros que se utilizan en la pantalla
//   AppointmentsScreen: {idEspecialista: string},
//   AppointmentScreen: {id_agenda?: string, idPaciente?: string, idEspecialista?: string, iCalUID?: string, start?: string, end?: string, correoEspecialista?: string, correoPaciente?: string}
// }


const Stack = createStackNavigator/* <AppointmentsStackParams> */();


export const DoctorNavigator = () => {
  return (
        <Stack.Navigator
          screenOptions= {{
            cardStyle: {
              backgroundColor: 'white'
            },
            headerStyle: {
              elevation: 0
            },
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="DoctorsSettingsScreen"
            component={DoctorsSettingsScreen}
          />
          <Stack.Screen
            name="DoctorProfileScreen"
            component={DoctorProfileScreen}
          />

        </Stack.Navigator>
  )
};