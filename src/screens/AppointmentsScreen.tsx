import React, {useContext, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';

import { StackScreenProps } from '@react-navigation/stack';

import {AppointmentsContext} from '../context/AppointmentsContext';
import { AppointmentsStackParams } from '../navigator/AppointmentsNavigator';


interface Props extends StackScreenProps<AppointmentsStackParams, 'AppointmentsScreen'>{};


export const AppointmentsScreen = ({navigation}: Props) => {
  //FIXME Existe un error con appointments
  const { appointments, loadAppointments } = useContext(AppointmentsContext);

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
    })
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
                <Text style={styles.appointmentDate}>{item.start}</Text>
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
    marginVertical: 10,
  },
  patient: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    marginVertical: 10,
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
    borderWidth: 2,
    alignItems: 'center',
    borderColor: 'black',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: '#4265FF'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 85
},

});