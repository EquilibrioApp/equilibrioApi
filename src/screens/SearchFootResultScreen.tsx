import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {PotencialUsuarioStackParams} from '../navigator/PotencialUsuarioNavigator';
import Clipboard from '@react-native-clipboard/clipboard';
import {SearchFoodStackParams} from '../navigator/SearchFoodNavigator';

interface Props
  extends StackScreenProps<SearchFoodStackParams, 'SearchFoodResultScreen'> {}

export const SearchFoodResultScreen = ({navigation, route}: Props) => {
  const {comida} = route.params;

  const copynutricionUrlToClipboard = () => {
    Clipboard.setString(comida.recipe.shareAs);
    Alert.alert('Link copiado al portapapeles')
  };
  const copyinstruccionesUrlToClipboard = () => {
    Clipboard.setString(comida.recipe.url);
    Alert.alert('Link copiado al portapapeles')
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/Logo.png')}
        style={{
          width: 80,
          height: 110,
          bottom: 35,
        }}
      />
      <View style={styles.card}>
        <Text style={styles.tittle}>{'Receta: '+ comida.recipe.label}</Text>
        <Text style={styles.info}>{'Calorias: ' + comida.recipe.calories}</Text>
        <Text style={styles.info}>{'Ingredientes: ' + comida.recipe.ingredientLines}</Text>
      </View>
      <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={copynutricionUrlToClipboard}>
            <Text style={styles.textBotton}>Nutrición</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={copyinstruccionesUrlToClipboard} >
            <Text style={styles.textBotton}>Instrucciones</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textBotton: {
    fontSize: 18,
    color: '#fff',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#FE7D56',
    padding: 10,
    borderRadius: 20,
  },
  buttonContainer: {
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    height: 400,
    width: 350,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,

    elevation: 13,
  },
  tittle: {
    fontSize: 28,
    marginBottom: 10,
    paddingHorizontal: 20,
    textAlign: 'justify',
    fontWeight: 'bold',
    color: '#081723',
  },
  info: {
    fontSize: 20,
    // marginTop: 20,
    textAlign: 'center',
    fontWeight: 'normal',
    marginBottom: 20,
    color: '#0D334F',
  },
});
