import React, {useContext, useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, ColorPropType, Alert } from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {Picker} from '@react-native-picker/picker';
import {AppointmentsStackParams} from '../navigator/AppointmentsNavigator';
import { useNombrePaciente } from '../hooks/useNombrePaciente';
import { useForm } from '../hooks/usForms';
import { AppointmentsContext } from '../context/AppointmentsContext';
import inicioApi from '../api/inicioApi';
import { PatientStackParams } from '../navigator/PatientNavigator';

interface Props extends StackScreenProps<PatientStackParams, 'NotificationScreen'> {};

export const NotificationScreen = ({ navigation, route }: Props) => {

  //Parámetros enviados mediante otra pantalla
  const { id_agenda, idPaciente, start, end, correoPaciente } = route.params;

  // const { names } = useNombrePaciente();//Obtiene los nombres de los pacientes

  // const { loadAppointmentById } = useContext( AppointmentsContext );

  const { id, correoP, idPat, inicioC, finC, form, onChange, setFormValue } = useForm({
      id: id_agenda,
      idPat: idPaciente,
      correoP: correoPaciente,
      inicioC: start,
      finC: end
  });

  

  useEffect(() => {
    navigation.setOptions({
      title: (correoPaciente) ? correoPaciente : 'Nueva notificación',
    });
    // loadAppointment();
  }, []);

  async function deleteAppointment() {
    console.log('Id de la notificación que se va a eliminar: ' + id_agenda);
    try {
      const resp = await inicioApi.delete(
        `/notificacion/${id_agenda}`
      );
      console.log(resp.status);
      if(resp.status === 200) {
        () => navigation.navigate('NotificationsScreen', {userId:idPaciente});
        Alert.alert('Notificación eliminada con exito.');
      }
      else{
        Alert.alert('Algo a salido mal al eliminar la notificación.');
      }
      
    } catch (error) {
      Alert.alert('No se pudo eliminar la notificación');
    }
  } 
  // const loadAppointment = async () => {
  //   //Previene error en petición si el id es vacío (nueva cita)
  //   if (id_agenda.length === 0) return;
  //   const appointment = await loadAppointmentById( id_agenda );
  //   console.log(form);
  //   setFormValue({
  //     id:  id_agenda,
  //     // nombreP: appointment.nombrePaciente,
  //     idEsp: /* appointment. */idEspecialista, 
  //     correoP: /* appointment. */correoPaciente,
  //     inicioC: /* appointment. */start,
  //     finC: /* appointment. */end
  //   });
  //   console.log(form);
  //   console.log(appointment);
  // }
  //TODO Función para revisar primer onChange del Picker 

  return (
    <View style={styles.container}>
      <View style={styles.cardButtons}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.buttonOpciones}
          onPress={deleteAppointment}>
          <Text style={styles.textOpciones}>Eliminar cita</Text>
        </TouchableOpacity>
      </View>
      {/* <Text>{JSON.stringify(form, null, 5)}</Text> */}
      {/* <ScrollView>
        // TODO Elegir el nombre del paciente mediante una consulta a la BD
        <Text style={styles.label}>Nombre del Paciente:</Text>
        <Picker
          selectedValue={correoPaciente}
          onValueChange={(value) => {
              // console.log(value);
              // setSelectedValue(value)
              onChange(value, 'correoP')
            }}
            
            >
          {
            names.map( (paciente) => (
              <Picker.Item 
              //TODO Generalizar las variables
              label={paciente.name}
                    // value={[paciente.email, paciente.id]}
                    value={paciente.email}
                    key = {paciente.email} />
              ))
          }
        </Picker>
        <Text style={styles.label}>Hora Inicio:</Text>
        <TextInput
          placeholder="AAAA-MM-DD"
          style={styles.textInput}
          value = {inicioC}
          onChangeText={( value )=> onChange( value, 'inicioC')}
          underlineColorAndroid="black"
        />
        <Text style={styles.label}>Hora Fin:</Text>
        <TextInput
          placeholder="AAAA-MM-DD"
          style={styles.textInput}
          value = {finC}
          onChangeText={( value )=> onChange( value, 'finC')}
          underlineColorAndroid="black"
        />
        <View style={styles.agendar}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.button}
            /* Permite navegar a la pantalla que sea necesario
            onPress={() => {}}>
            <Text style={styles.buttonText}>Agendar Cita</Text>
          </TouchableOpacity>
        </View>
        <Text>
          {JSON.stringify(form, null, 5)}
        </Text>
      </ScrollView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  label: {
    fontSize: 30,
    color: 'black',
  },
  textInput: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 5,
    marginBottom: 10,
  },
  agendar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 85,
  },
  button: {
    borderWidth: 2,
    borderColor: 'rgb(36, 255, 0)',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  tittle: {
    fontSize: 55,
    paddingHorizontal: 20,
    textAlignVertical: 'top',
    fontWeight: '100',
    color: '#4265FF',
  },
  buttonConfig: {
    fontSize: 30,
    margin: 9,
    width: 150,
    height: 150,
    borderRadius: 40,
    top: 70,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 30,
    fontWeight: '100',
    textAlign: 'center',
    color: '#4265FF',
    padding: 10,
    // top: 190,
  },
  cardProgreso: {
    // backgroundColor: '#FFE8C3',
    width: 375,
    height: 350,
    borderRadius: 50,
    flexDirection: 'column',
    alignItems: 'center',
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
    shadowColor: '#000',
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