import {useNavigation} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {FoodDto, Recipe, SearchDoctorByPC} from '../interfaces/appInterfaces';
import {SearchFoodResultScreen} from '../navigator/SearchFoodNavigator';

interface Props /* extends StackScreenProps<PotencialUsuarioStackParams, 'PotentialUserScreen'> */ {
  comida: FoodDto;
}

export const FindFoodCard = ({comida /* , navigation */}: Props) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate('SearchFoodResultScreen', {comida: comida})
      }>
      <View style={styles.cardContainer}>
        <Text style={styles.name}>{comida.recipe.label + ' '}</Text>
        <Text style={styles.info}>
          {/* {comida.ingredients + ' '} */}
          {comida.recipe.calories}
        </Text>
        {/* <Text style={styles.info}>{'C.P. ' + doctor.postalCode}</Text> */}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    backgroundColor: '#4265FF9C',
    height: 100,
    padding: 10,
    width: 350,
    marginBottom: 25,
    borderRadius: 35,
    alignItems: 'center',
  },
  name: {
    top: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  info: {
    top: 10,
    fontSize: 18,
    fontWeight: 'normal',
  },
});
