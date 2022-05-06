import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import {PatientsMainScreen} from '../screens/PatientsMainScreen';
import { Image } from 'react-native';

const Tab = createBottomTabNavigator();

export const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
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
            <Feather name="user" color={'orange'} size={30} />
            // <Image
            //     source = {require('../assets/home.png')}
            //     style = {{
            //         width: 30,
            //         height: 30,
            //         alignSelf: 'center',
            //         // bottom: 10
            //     }}
            // />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
