import React, {useContext, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';

import { StackScreenProps } from '@react-navigation/stack';

import {AppointmentsContext} from '../context/AppointmentsContext';
import { AppointmentsStackParams } from '../navigator/AppointmentsNavigator';


interface Props extends StackScreenProps<AppointmentsStackParams, 'AppointmentsScreen'>{};


export const AppointmentsScreen = ({navigation}: Props) => {
  //FIXME Existe un error con appointments
  const {appointments, loadAppointments} = useContext(AppointmentsContext);

  useEffect(() => {

      navigation.setOptions({
          headerRight: () => (
            <TouchableOpacity
              activeOpacity= {0.8}
              style={{marginRight: 20}}
              onPress={ () => navigation.navigate('AppointmentScreen', {}) }
            >
              <Text style={styles.addAppointment}>+</Text>
            </TouchableOpacity>
          )
      })
    
  }, [])
  
  return (
    <View style={{flex: 1, marginHorizontal: 10}}>
      <FlatList
        data={appointments}
        keyExtractor={appointment => appointment.id}//id viene del JSON del back
        renderItem={({item}) => (
          <TouchableOpacity
            activeOpacity={0.8}
            // Paso de la informacion al hacer click para otra pantalla
            onPress={
                () => navigation.navigate('AppointmentScreen', {
                    idCita: item.id,
                    nombrePaciente: item.nombrePaciente,
                    inicio: item.inicio,
                    fin: item.fin
                })
            }
          >
            <>
              <Text style={styles.appointmentDate}>{item.fin}</Text>
              <Text style={styles.patient}>{item.nombrePaciente}</Text>
            </>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => (
            <View style={styles.itemSeparator}/>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  appointmentDate: {
    fontSize: 30,
  },
  patient: {
    fontSize: 20,
    textAlign: 'center',
  },
  itemSeparator: {
    borderBottomWidth: 5,
    marginVertical: 5,
    borderBottomColor: 'white',
  },
  addAppointment: {
    fontSize: 30,
  }

});
