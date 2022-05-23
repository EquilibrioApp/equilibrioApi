import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useGetUserInfo} from '../hooks/useGetUserInfo';

export const DoctorProfileScreen = () => {
  const {user} = useGetUserInfo();

  return (
    <View style={styles.container}>
      <Text style={styles.tittle}>Mi Perfil</Text>
      <View style={styles.card}>
        <View style={styles.miniCard}>
            <Text style={styles.text}>Nombre:</Text>
            <Text style={styles.info}>{user?.name + ' ' + user?.fathersLastName + ' ' + user?.mothersLastName}</Text>
        </View>
        <View style={styles.miniCard}>
            <Text style={styles.text}>Fecha de nacimiento:</Text>
            <Text style={styles.info}>{user?.birthDate.substring(0, 10)}</Text>
        </View>
        <View style={styles.miniCard}>
            <Text style={styles.text}>Correo:</Text>
            <Text style={styles.info}>{user?.email}</Text>
        </View>
        <View style={styles.miniCard}>
            <Text style={styles.text}>Telefono:</Text>
            <Text style={styles.info}>{user?.phoneNumber}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  tittle: {
    fontSize: 50,
    fontWeight: '100',
    color: '#4265FF',
    right: 100,
    bottom: 17,
    top: 3,
    paddingBottom: 10
  },
  card: {
    backgroundColor: '#F5F5F5',
    height: 550,
    width: 375,
    padding: 10,
    borderRadius: 50,
    flexDirection: 'column',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowOpacity: 0.55,
    shadowRadius: 14.78,

    elevation: 20,
  },
  miniCard:{
    backgroundColor: 'white',
    height: 125,
    width: 355,
    padding: 10,
    marginBottom: 10,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowOpacity: 0.55,
    shadowRadius: 14.78,
    elevation: 20,
    alignItems: 'center',
  },
  info: {
    fontSize: 27,
    // marginTop: 20,
    textAlign: 'center',
    fontWeight: '100',
    marginBottom: 5,
    color: 'grey'
  },
  text: {
    fontSize: 34,
    // marginTop: 20,
    textAlign: 'center',
    fontWeight: '100',
    // marginBottom: 20,
    color: '#4265FF'
  }
});