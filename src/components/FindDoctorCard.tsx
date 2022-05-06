import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { SearchDoctorByPC } from '../interfaces/appInterfaces';


interface Props {
    doctor: SearchDoctorByPC;
}

export const FindDoctorCard = ({doctor}: Props) => {


  const navigation = useNavigation();

  return (
    <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('PotentialUserResultScreen', {doctor:doctor})}
    >
        <View style={styles.cardContainer}>
            <Text style={styles.name}>
                {doctor.user.name + ' '}
                {doctor.user.fathersLastName + ' '}
                {doctor.user.mothersLastName}
            </Text>
            <Text style={styles.info}>
                {doctor.streetName + ' '}
                {'No. ' + doctor.houseNumber + '\n'}
            </Text>
            <Text style={styles.info}>
            {'C.P. ' + doctor.postalCode}
            </Text>
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 10,
        backgroundColor: '#4265FF9C',
        height: 120,
        width: 350,
        marginBottom: 25,
        borderRadius: 35,
        alignItems: 'center',
    },
    name:{
        top: 10,
        fontSize: 20,
        fontWeight: '200',
    },
    info:{
        top: 10,
        fontSize: 18,
        fontWeight: '200'
    }

});
