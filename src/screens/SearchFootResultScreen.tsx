import React, { useState } from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { PotencialUsuarioStackParams } from '../navigator/PotencialUsuarioNavigator';
import Clipboard from '@react-native-clipboard/clipboard';
import { SearchFoodStackParams } from '../navigator/SearchFoodNavigator';


interface Props extends StackScreenProps<SearchFoodStackParams, 'SearchFoodResultScreen'> {};

export const SearchFoodResultScreen = ( {navigation, route}: Props ) => {
  
  const { food } = route.params;

  // const copyCelToClipboard = () => {
  //   Clipboard.setString(food.user.phoneNumber);
  //   Alert.alert('Telefono copiado al portapapeles')
  // };
  // const copyMailToClipboard = () => {
  //   Clipboard.setString(food.user.email);
  //   Alert.alert('Correo copiado al portapapeles')
  // };



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
        <Text style={styles.tittle}>Nombre del Especialista:</Text>
        <Text style={styles.info}>{food.label
        // food.user.name + ' ' + food.user.fathersLastName  + ' ' + food.user.mothersLastName
      }</Text>
        {/* <Text style={styles.tittle}>Dirección:</Text>
        <Text style={styles.info}>{food.streetName + ' No. ' + food.houseNumber}</Text>
        <Text style={styles.tittle}>Código Postal:</Text>
        <Text style={styles.info}>{food.postalCode}</Text>
        <TouchableOpacity onPress={copyCelToClipboard}>
          <Text style={styles.tittle}>Telélefono de contacto:</Text>
          <Text style={styles.info}>{food.user.phoneNumber}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={copyMailToClipboard}>
          <Text style={styles.tittle}>Correo electrónico:</Text>
          <Text style={styles.info}>{food.user.email}</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2597f4',
    height: 600,
    width: 350,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.30,

    elevation: 13,
  },
  tittle: {
    fontSize: 28,
    marginBottom: 10,
    paddingHorizontal: 20,
    textAlign: 'justify',
    fontWeight: '100',
    color: 'white'
  },
  info: {
    fontSize: 20,
    // marginTop: 20,
    textAlign: 'center',
    fontWeight: '100',
    marginBottom: 20,
    color: 'white'
  }
});