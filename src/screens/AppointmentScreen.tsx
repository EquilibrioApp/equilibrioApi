import React, {useContext, useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {Picker} from '@react-native-picker/picker';
import {AppointmentsStackParams} from '../navigator/AppointmentsNavigator';
import { useNombrePaciente } from '../hooks/useNombrePaciente';
import { useForm } from '../hooks/usForms';
import { AppointmentsContext } from '../context/AppointmentsContext';

interface Props extends StackScreenProps<AppointmentsStackParams, 'AppointmentScreen'> {};

export const AppointmentScreen = ({ navigation, route }: Props) => {

  //Parámetros enviados mediante otra pantalla
  const { id_agenda = '', idEspecialista = '', start = '', end = '', correoPaciente = '' } = route.params;

  const { pacientes } = useNombrePaciente();//Obtiene los nombres de los pacientes

  const { loadAppointmentById } = useContext( AppointmentsContext );

  const { id, /* nombreP, */ correoP, inicioC, finC, form, onChange, setFormValue } = useForm({
      id: id_agenda,
      // nombreP: nombrePaciente,
      correoP: correoPaciente,
      inicioC: start,
      finC: end
  });

  

  useEffect(() => {
    navigation.setOptions({
      title: (correoPaciente) ? correoPaciente : 'Nueva cita',
    });
    loadAppointment();
  }, [])

  const loadAppointment = async () => {
    //Previene error en petición si el id es vacío (nueva cita)
    if (id_agenda.length === 0) return;
    const appointment = await loadAppointmentById( id_agenda );
    console.log(form);
    setFormValue({
      id:  id_agenda,
      // nombreP: appointment.nombrePaciente,
      correoP: appointment.correoPaciente,
      inicioC: appointment.start,
      finC: appointment.end
    });
    console.log(form);
    console.log(appointment);
  }
  //TODO Función para revisar primer onChange del Picker 

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* TODO Elegir el nombre del paciente mediante una consulta a la BD */}
        <Text style={styles.label}>Nombre del Paciente:</Text>

        <Picker
          selectedValue={correoP}
          onValueChange={(value) => {
              console.log(value);
              onChange(value, 'correoP');
            }}
          
        >
          {
              pacientes.map( (paciente, index) => (
                <Picker.Item 
                //TODO Generalizar las variables
                    label={paciente.nombre}
                    value={paciente.correo}
                    key = {index} />
                
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
            /* Permite navegar a la pantalla que sea necesario */
            onPress={() => {}}>
            <Text style={styles.buttonText}>Agendar Cita</Text>
          </TouchableOpacity>
        </View>

        <Text>
          {JSON.stringify(form, null, 5)}
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 20,
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
  buttonText: {
    fontSize: 18,
    color: 'black',
  },
});
