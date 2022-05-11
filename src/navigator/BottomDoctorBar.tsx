import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AppointmentsNavigator } from './AppointmentsNavigator';
import { ExpedientesNavigator } from './ExpedientesNavigator';
import { DoctorNavigator } from './DoctorNavigator';

const Tab = createBottomTabNavigator();

export const BottomDoctorTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        // tabBarShowLabel: false,
        headerStyle: {
          elevation: 0,
        },
        headerShown: false,
      }}>
      <Tab.Screen
        name="Home"
        component={AppointmentsNavigator}
        options={{
          tabBarIcon: () => (
            <Ionicons name="home" color={'blue'} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Expedientes"
        component={ExpedientesNavigator}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="albums-outline" color={'blue'} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={DoctorNavigator}
        options={{
          tabBarIcon: ({color, size}) => (
            <Feather name="user" color={'blue'} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};