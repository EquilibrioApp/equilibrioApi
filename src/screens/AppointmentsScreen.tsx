import React, {useContext, useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { StackScreenProps } from '@react-navigation/stack';

import {AppointmentsContext} from '../context/AppointmentsContext';
import { AppointmentsStackParams } from '../navigator/AppointmentsNavigator';
import inicioApi from '../api/inicioApi';
import { AppointmentsDto } from '../interfaces/appInterfaces';


interface Props extends StackScreenProps<AppointmentsStackParams, 'AppointmentsScreen'>{};


export const AppointmentsScreen = ({navigation}: Props) => {
  //FIXME Existe un error con appointments
  const [ appointments, setAppointments ] = useState<AppointmentsDto[]>([]);

  const loadAppointments = async(  ) => {

    const idEspecialista = await AsyncStorage.getItem('id');

    try {
      const resp = await inicioApi.get<AppointmentsDto[]>(`agenda/${idEspecialista}`);
      setAppointments(resp.data);
      console.log('Citas extraidas: ' + resp.data);
    } catch (error) {
      throw new Error("Error al obtener las citas del especialista en cuestion.");
    }

  }

  useEffect(() => {
    navigation.setOptions({
        headerRight: () => (
          <View>
            <TouchableOpacity
              activeOpacity= {0.8}
              style={{marginRight: 20}}
              onPress={ () => navigation.navigate('AppointmentScreen', {}) }
            >
              <Text style={styles.addAppointment}>+</Text>
            </TouchableOpacity>
          </View>
        )
    });
    loadAppointments();
  }, [])
  
  return (
    <View style={{flex: 1, marginHorizontal: 10}}>
      <FlatList
        data={ appointments }
        keyExtractor={ (appointment) => appointment.id_agenda}//id viene del JSON del back
        renderItem={ ({item}) => (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.card}
              // Paso de la informacion al hacer click para otra pantalla
              onPress={
                  () => navigation.navigate('AppointmentScreen', {
                      id_agenda: item.id_agenda,
                      idEspecialista: item.idEspecialista,
                      correoPaciente: item.correoPaciente,
                      start: item.start,
                      end: item.end
                  })
              }
            >
              <>
                <Text style={styles.appointmentDate}>{item.end.substring(0, 10)}</Text>
                <Text style={styles.appointmentDate}>{item.start.substring(11, 16) + ' a ' + item.end.substring(11, 16)}</Text>
                <Text style={styles.patient}>{item.correoPaciente}</Text>
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
    fontSize: 27,
    color: 'white',
    fontWeight: '100'
  },
  patient: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    fontWeight: '100'
  },
  itemSeparator: {
    borderBottomWidth: 5,
    marginVertical: 5,
    borderBottomColor: 'white',
  },
  addAppointment: {
    fontSize: 30,
  },
  card: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: '#8FA4FF'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 85
},

});