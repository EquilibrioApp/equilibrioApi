import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList
} from 'react-native';
import { SearchBarDoctor } from '../components/SearchBarDoctor';
import { useDoctorPCSearch } from '../hooks/useDoctorPCSearch';
import { FindDoctorCard } from '../components/FindDoctorCard';
import { LoadingScreen } from './LoadingScreen';

interface Props extends StackScreenProps<any, any> {}

export const PotentialUserScreen = ({navigation}: Props) => {

  const { isLoading, doctorsList, setPostalCode } = useDoctorPCSearch();

  // if (isLoading) {
  //   return <LoadingScreen/>
  // }

  return (
    <>
      <View style={styles.container}>
        {/* Código para el logo */}
        <View
          style={{
            alignItems: 'center',
          }}>
          <Image
            source={require('../assets/Logo.png')}
            style={{
              width: 80,
              height: 110,
              bottom: 10,
            }}
          />
        </View>

        <Text style={styles.tittle}>
          Introduzca los datos que se le piden para poder buscar al especialista
          más cercano.
        </Text>

        <View>
          <Text style={styles.text}>Código Postal: </Text>

          <SearchBarDoctor
            setPostalCode={setPostalCode}
          />
        </View>
        <FlatList
            data={ doctorsList }
            keyExtractor={(doctor) => doctor.user.id}
            renderItem={ ({ item }) => (<FindDoctorCard doctor={item}/>) }
        />
      </View>
    </>
  );
};

/* Estilos para los botones y los textos */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 25
  },
  tittle: {
    fontSize: 28,
    marginBottom: 20,
    paddingHorizontal: 20,
    textAlign: 'justify',
    fontWeight: '100',
    color: 'grey'
  },
  text: {
    fontSize: 20,
    marginTop: 20,
    textAlign: 'center',
    fontWeight: '100',
    marginBottom: 20,
    color: 'grey'
  }

});
