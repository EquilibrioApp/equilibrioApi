import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ColorPropType,
  Alert,
  SafeAreaView,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {Picker} from '@react-native-picker/picker';
import {AppointmentsStackParams} from '../navigator/AppointmentsNavigator';
import {useNombrePaciente} from '../hooks/useNombrePaciente';
import {useForm} from '../hooks/usForms';
import {AppointmentsContext} from '../context/AppointmentsContext';
import inicioApi from '../api/inicioApi';
import DatePicker from 'react-native-datepicker';

interface Props
  extends StackScreenProps<AppointmentsStackParams, 'AppointmentScreen'> {}

export const AppointmentScreen = ({navigation, route}: Props) => {
  //Parámetros enviados mediante otra pantalla
  const {
    id_agenda,
    idEspecialista,
    idPaciente,
    correoPaciente,
    correoEspecialista,
    start,
    end,
    iCalUID,
  } = route.params;

  const [date, setDate] = useState(start?.substring(0, 10));
  const {dia, inicioC, finC, form, onChange} = useForm({
    dia: '',
    inicioC: '',
    finC: '',
  });

  useEffect(() => {
    navigation.setOptions({
      title: correoPaciente ? correoPaciente : 'Nueva cita',
    });
    // loadAppointment();
  }, []);

  async function deleteAppointment() {
    console.log('Id de la cita que se va a eliminar: ' + id_agenda);

    const actual = new Date();
    let actualYear = actual.toISOString();
    const fecha = start;
    console.log('actualYear = '+actualYear);
    console.log('fecha = '+fecha);
    const hoy = new Date(actualYear).getTime();
    console.log('const hoy = '+hoy);
    const termino = new Date(fecha).getTime();
    console.log('const termino = '+termino);
    const hoursRemaining = ((termino - hoy) / (1000 * 60 * 60)) + 5;
    console.log('hoursRemaining = '+hoursRemaining);
    if (hoursRemaining < 1) {
      Alert.alert('La cita no puede ser cancelada con menos de una hora de anticipacion.')
    }
    else{
      try {
        const resp = await inicioApi.delete(`/agenda/${id_agenda}`);
        console.log(resp.status);
        if (resp.status === 200) {
          () => navigation.navigate('AppointmentsScreen', {idEspecialista});
          Alert.alert('Cita eliminada con exito.');
        } else {
          Alert.alert('Algo a salido mal al eliminar la cita.');
        }
      } catch (error) {
        Alert.alert('No se pudo eliminar la cita');
      }
    }
  }
  async function updateAppointment() {
    // try {
    //   const resp = await inicioApi.delete(`/agenda/${id_agenda}`);
    //   console.log(resp.status);
    //   if (resp.status === 200) {
    //     () => navigation.navigate('AppointmentsScreen', {idEspecialista});
    //     Alert.alert('Cita eliminada con exito.');
    //   } else {
    //     Alert.alert('Algo a salido mal al eliminar la cita.');
    //   }
    // } catch (error) {
    //   Alert.alert('No se pudo eliminar la cita');
    // }
    let start =
      dia +
      'T' +
      inicioC.substring(0, 2) +
      ':' +
      inicioC.substring(2, 4) +
      ':00';
    let end =
      dia + 'T' + finC.substring(0, 2) + ':' + finC.substring(2, 4) + ':00';

    try {
      const resp = await inicioApi.put(`/agenda/${id_agenda}`, {
        id_agenda,
        idPaciente,
        idEspecialista,
        start,
        end,
        correoEspecialista,
        correoPaciente,
      });
      console.log(resp.status);
      if (resp.status === 200) {
        Alert.alert('Cita reagendada con exito.');
      } else {
        Alert.alert('Algo a salido mal al reagendar la cita.');
      }
    } catch (error) {
      Alert.alert('No se pudo reagendar la cita');
    }
    console.log(start, end);
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* // TODO Elegir el nombre del paciente mediante una consulta a la BD */}

        <SafeAreaView style={styles.container}>
          <View style={styles.container}>
            <Text style={styles.title}>Fecha de la cita:</Text>
            <DatePicker
              style={styles.datePickerStyle}
              date={date}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              minDate="2022-01-01"
              maxDate="2036-12-31"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  marginHorizontal: 20,
                  position: 'absolute',
                  right: -5,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  marginHorizontal: 30,
                  height: 40,
                  width: '90%',
                  paddingHorizontal: 30,
                  borderColor: 'gray',
                  alignItems: 'flex-start',
                  borderWidth: 0,
                  borderBottomWidth: 1,
                },
                placeholderText: {
                  fontSize: 17,
                  color: 'gray',
                },
                dateText: {
                  fontSize: 17,
                },
              }}
              onDateChange={date => {
                setDate(date);
                onChange(date, 'dia');
              }}
            />
          </View>
        </SafeAreaView>
        <Text style={styles.label}>Hora Inicio:</Text>
        <TextInput
          placeholder="1800"
          style={styles.textInput}
          keyboardType="number-pad"
          value={inicioC}
          onChangeText={value => onChange(value, 'inicioC')}
        />
        <Text style={styles.label}>Hora Fin:</Text>
        <TextInput
          placeholder="1830"
          style={styles.textInput}
          keyboardType="number-pad"
          value={finC}
          onChangeText={value => onChange(value, 'finC')}
        />

        <View style={styles.agendar}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.button}
            onPress={updateAppointment}>
            <Text style={styles.buttonText}>Reagendar Cita</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.buttonCancelar}
            onPress={deleteAppointment}>
            <Text style={styles.textOpciones}>Eliminar cita</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Text>{JSON.stringify(form, null, 5)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  title: {
    color: '#000',
    fontSize: 20,
    // fontWeight: 'bold',
    marginVertical: 10,
    // marginHorizontal: 40,
    fontWeight: '100',
  },
  label: {
    fontSize: 20,
    fontWeight: '100',
    alignSelf: 'center',
    color: 'black',
  },
  textInput: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 5,
    marginBottom: 10,
    alignSelf: 'center',
    borderWidth: 0.3,
    justifyContent: 'center',
    borderRadius: 10,
    // height: 200,
    width: '20%',
  },
  agendar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  button: {
    backgroundColor: '#F5F5F5',
    margin: 10,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  buttonCancelar: {
    backgroundColor: 'red',
    margin: 10,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
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
  datePickerStyle: {
    width: 230,
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
