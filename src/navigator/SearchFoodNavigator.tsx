import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {FoodDto, Recipe, SearchDoctorByPC} from '../interfaces/appInterfaces';
import {SearchFoodScreen} from '../screens/SearchFoodScreen';
import {SearchFoodResultScreen} from '../screens/SearchFootResultScreen';

export type SearchFoodStackParams = {
  SearchFoodScreen: undefined;
  SearchFoodResultScreen: {food: Recipe};
};

const Stack = createStackNavigator<SearchFoodStackParams>();

export const SearchFoodNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="SearchFoodScreen" component={SearchFoodScreen} />
      <Stack.Screen name="SearchFoodResultScreen" component={SearchFoodResultScreen}
      />
    </Stack.Navigator>
  );
};
