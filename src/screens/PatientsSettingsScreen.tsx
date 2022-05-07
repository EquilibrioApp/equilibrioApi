import React, { useContext } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import {StackScreenProps} from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext';

interface Props extends StackScreenProps<any, any> {}

export const PatientsSettingsScreen = ({navigation}: Props) => {
  
  const {token, logOut} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.tittle}>Configuración</Text>

      <View style={styles.cardProgreso}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.buttonConfig}
          onPress={() => navigation.navigate('PatientProfileScreen')}>
          <Text style={styles.buttonText}>Mi Info</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardButtons}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.buttonOpciones}
          onPress={logOut}>
          <Text style={styles.textOpciones}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tittle: {
    fontSize: 55,
    paddingHorizontal: 20,
    textAlignVertical: 'top',
    fontWeight: '100',
    color: '#ff7e00',
  },
  buttonConfig: {
    fontSize: 30,
    margin: 9,
    width: 370,
    height: 150,
    borderRadius: 40,
    top: 70,
    backgroundColor: '#FFAB2480',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 30,
    fontWeight: '100',
    textAlign: 'center',
    color: 'black',
    // top: 190,
  },
  cardProgreso: {
    // backgroundColor: '#FFE8C3',
    width: 375,
    height: 350,
    borderRadius: 50,
    flexDirection: 'column',
    alignItems: 'center'
  },
  text: {
    fontSize: 28,
    top: 50,
    fontWeight: '100',
    color: '#000000',
    zIndex: 100,
  },
  cardButtons: {
    // backgroundColor: '#FFE8C3',
    width: 300,
    height: 150,
    borderRadius: 50,
    // flexDirection: 'row',
    alignItems: 'center',
    top: 150,
  },
  buttonOpciones: {
    margin: 5,
    width: 200,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#ff002b',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.53,
    shadowRadius: 13.97,
    elevation: 21,
  },
  textOpciones: {
    fontSize: 30,
    margin: 10,
    fontWeight: '100',
    color: 'white',
    zIndex: 100,
    flexDirection: 'column',
    alignSelf: 'center',
  },
});