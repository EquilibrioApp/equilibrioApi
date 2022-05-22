import React, {useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import { 
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useGetUserInfo } from '../hooks/useGetUserInfo';

interface Props extends StackScreenProps<any, any> {}

export const PatientsMainScreen = ({route, navigation}: Props) => {


  const {user} = useGetUserInfo();
  // const {} = route.params;
  // const {token, logOut} = useContext(AuthContext);
  const [value, setValue] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.tittle}>¡Hola!</Text>

      <Text style={styles.text}>Progreso del dia</Text>
      <View style={styles.cardProgreso}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.buttonProgreso}
          onPress={() => navigation.navigate('WaterRegister')}>
          <Text style={styles.buttonText}>Agua</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.buttonProgreso}
          onPress={() => navigation.navigate('ExcerciseRegister', {UserId: user?.id})}>
          <Text style={styles.buttonText}>Ejercicio</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardButtons}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.buttonOpciones}
          onPress={() => navigation.navigate('RegisterPatScreen', {UserId: user?.id})}>
          <Text style={styles.textOpciones}>Registro Rapido</Text>
          <Feather name="book-open" color={'orange'} size={60} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.buttonOpciones}
          onPress={() => navigation.navigate('MetaAvancesScreen', {UserId: user?.id})}>
          <Text style={styles.textOpciones}>Metas vs Avances</Text>
          
          <Feather name="pie-chart" color={'orange'} size={60} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

/* Estilos para los botones y los textos */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tittle: {
    fontSize: 40,
    paddingHorizontal: 20,
    textAlignVertical: 'top',
    fontWeight: '100',
    color: '#ff7e00',
  },
  buttonProgreso: {
    fontSize: 30,
    margin: 9,
    width: 170,
    height: 250,
    borderRadius: 40,
    top: 70,
    backgroundColor: '#F5F5F5',
  },
  buttonText: {
    fontSize: 30,
    fontWeight: '100',
    textAlign: 'center',
    color: 'black',
    top: 190,
  },
  cardProgreso: {
    backgroundColor: '#FFE8C3',
    width: 375,
    height: 350,
    borderRadius: 50,
    flexDirection: 'row',
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
    flexDirection: 'row',
    marginTop: 20,
  },
  buttonOpciones: {
    fontSize: 30,
    margin: 5,
    width: 140,
    height: 140,
    borderRadius: 40,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
  },
  textOpciones: {
    fontSize: 20,
    margin: 10,
    fontWeight: '100',
    color: '#000000',
    zIndex: 100,
    flexDirection: 'column',
    alignSelf: 'center',
  },
});
