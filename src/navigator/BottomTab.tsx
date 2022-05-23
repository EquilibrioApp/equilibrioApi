import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PatientsMainScreen} from '../screens/PatientsMainScreen';
import {PatientsSettingsScreen} from '../screens/PatientsSettingsScreen';
import {PotencialUsuarioNavigator} from './PotencialUsuarioNavigator';
import {SearchFoodNavigator} from './SearchFoodNavigator';

const Tab = createBottomTabNavigator();

export const BottomTab = () => {
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
        component={PatientsMainScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="home" color={'orange'} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Configuración"
        component={PatientsSettingsScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Feather name="user" color={'orange'} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Recetas"
        component={SearchFoodNavigator}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="fast-food-outline" color={'orange'} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
