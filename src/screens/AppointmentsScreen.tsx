import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
  TextInput,
  SafeAreaView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {StackScreenProps} from '@react-navigation/stack';

import {AppointmentsContext} from '../context/AppointmentsContext';
import {AppointmentsStackParams} from '../navigator/AppointmentsNavigator';
import inicioApi from '../api/inicioApi';
import {AppointmentsDto} from '../interfaces/appInterfaces';
import {Styles} from '../theme/StyleTheme';
import DatePicker from 'react-native-datepicker';
import {useForm} from '../hooks/usForms';
import {useNombrePaciente} from '../hooks/useNombrePaciente';
import {Picker} from '@react-native-picker/picker';

interface Props
  extends StackScreenProps<AppointmentsStackParams, 'AppointmentsScreen'> {}

export const AppointmentsScreen = ({navigation}: Props) => {
  //FIXME Existe un error con appointments
  const [view, setView] = useState(false);
  const [userType, setUserType] = useState();
  const [selectedName, setSelectedName] = useState<string>('1');
  const [selectedEmail, setSelectedEmail] = useState('');
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
  const [appointments, setAppointments] = useState<AppointmentsDto[]>([]);
  const {names} = useNombrePaciente(); //Obtiene los nombres de los pacientes
  const {idPaciente, start1, start2, end1, correoPaciente, form, onChange} =
    useForm({
      idPaciente: '',
      start1: '',
      start2: '',
      end1: '',
      correoPaciente: '',
    });

  async function loadAppointments() {
    const idEspecialista = await AsyncStorage.getItem('id');
    try {
      const resp = await inicioApi.get<AppointmentsDto[]>(
        `agenda/${idEspecialista}`,
      );
      setAppointments(resp.data);
      console.log('Citas extraidas: ' + resp.data);
    } catch (error) {
      throw new Error(
        'Error al obtener las citas del especialista en cuestion.',
      );
    }
  }
  async function getTypeOfUser() {
    let userType = await AsyncStorage.getItem('userType');
    console.log('userType en la funcion: '+userType);
    // setUserType(userType);
    
  }
  console.log('userType fuera de la funcion: '+userType);
  async function createAppointment() {
    const idEspecialista = await AsyncStorage.getItem('id');
    const correoEspecialista =
      'equilibrio.veri@gmail.com'; /* await AsyncStorage.getItem('email'); */
    let start =
      start1 +
      'T' +
      start2.substring(0, 2) +
      ':' +
      start2.substring(2, 4) +
      ':00';
    let end =
      start1 + 'T' + end1.substring(0, 2) + ':' + end1.substring(2, 4) + ':00';

    if (
      (idPaciente.length &&
        idEspecialista?.length &&
        start.length &&
        end.length &&
        correoEspecialista.length &&
        correoPaciente) !== 0
    ) {
      try {
        const resp = await inicioApi.post(`/agenda/create`, {
          idPaciente,
          idEspecialista,
          start,
          end,
          correoEspecialista,
          correoPaciente,
        });
        console.log(resp.status);
        if (resp.status === 201) {
          setView(false);
          Alert.alert('Cita registrada con exito.');
        } else {
          Alert.alert('Algo a salido mal al registrar la cita.');
        }
      } catch (error) {
        Alert.alert('No se pudo insertar la cita');
      }
    }
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{marginRight: 20}}
            onPress={() => {
              setView(true);
            }}>
            <Text style={styles.addAppointment}>+</Text>
          </TouchableOpacity>
        </View>
      ),
    });
    loadAppointments();
    getTypeOfUser();
  }, [view]);

  return (
    
      <View style={{flex: 1, marginHorizontal: 10}}>
        <Modal animationType="fade" visible={view} transparent={true}>
          <View style={styles.containerModal}>
            <View style={styles.subcontainerModal}>
              <View style={styles.headerContainerModal}>
                <TouchableOpacity onPress={() => setView(false)}>
                  <Image
                    source={require('../assets/Close.png')}
                    style={Styles.btnClose}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flex: 1,
                  // justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={styles.titleT}>Agendar nueva cita</Text>
                <Text style={styles.title}>Nombre del paciente</Text>

                <Picker
                  selectedValue={correoPaciente}
                  style={{height: 50, width: 300, marginLeft: 50}}
                  onValueChange={value => {
                    setSelectedName(value);
                    onChange(value, 'correoPaciente');
                  }}>
                  <Picker.Item label="Seleccione un paciente" value="" />
                  {names.map((paciente /* , index */) => (
                    <Picker.Item
                      //TODO Generalizar las variables
                      label={paciente.name}
                      value={paciente.email}
                      key={paciente.email}
                    />
                  ))}
                </Picker>

                <Text style={styles.title}>Correo del paciente</Text>
                <Picker
                  selectedValue={idPaciente}
                  style={{height: 50, width: 300, marginLeft: 50}}
                  onValueChange={value => {
                    setSelectedEmail(value);
                    onChange(value, 'idPaciente');
                  }}>
                  <Picker.Item label="Seleccione un correo" value="" />
                  {names.map((paciente /* , index */) => (
                    <Picker.Item
                      //TODO Generalizar las variables
                      label={paciente.email}
                      value={paciente.id}
                      key={paciente.id}
                    />
                  ))}
                </Picker>
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
                        onChange(date, 'start1');
                      }}
                    />
                  </View>
                </SafeAreaView>
                <Text style={styles.title}>Hora de la cita:</Text>
                <View style={{flexDirection: 'row'}}>
                  <TextInput
                    style={styles.inputNota}
                    placeholder="1830"
                    keyboardType="number-pad"
                    maxLength={4}
                    placeholderTextColor="rgba(0, 0, 0, 0.54)"
                    onChangeText={value => onChange(value, 'start2')}
                    value={start2}
                  />
                  <Text style={styles.title}>a</Text>
                  <TextInput
                    style={styles.inputNota}
                    placeholder="1845"
                    maxLength={4}
                    keyboardType="number-pad"
                    placeholderTextColor="rgba(0, 0, 0, 0.54)"
                    onChangeText={value => onChange(value, 'end1')}
                    value={end1}
                  />
                </View>
                <TouchableOpacity
                  activeOpacity={0.2}
                  style={styles.touchableCrearExpediente}
                  onPress={createAppointment /* () => console.log(form) */}>
                  <Text style={styles.touchableCrearExpedienteTexto}>
                    Agendar Cita
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <FlatList
          data={appointments}
          keyExtractor={appointment => appointment.id_agenda} //id viene del JSON del back
          renderItem={({item}) => (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.card}
              // Paso de la informacion al hacer click para otra pantalla
              onPress={() =>
                navigation.navigate('AppointmentScreen', {
                  id_agenda: item.id_agenda,
                  idEspecialista: item.idEspecialista,
                  idPaciente: item.idPaciente,
                  correoPaciente: item.correoPaciente,
                  correoEspecialista: item.correoEspecialista,
                  start: item.start,
                  end: item.end,
                  iCalUID: item.iCalUID,
                })
              }>
              <>
                <Text style={styles.appointmentDate}>
                  {item.end.substring(0, 10)}
                </Text>
                <Text style={styles.appointmentDate}>
                  {item.start.substring(11, 16) +
                    ' a ' +
                    item.end.substring(11, 16)}
                </Text>
                <Text style={styles.patient}>{item.correoPaciente}</Text>
              </>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        />
      </View>
    
      
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 2,
    alignItems: 'center',
  },
  datePickerStyle: {
    width: 230,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  expedienteName: {
    fontSize: 20,
    marginHorizontal: 20,
  },
  // itemSeparator: {
  //   borderBottomWidth: 2,
  //   marginVertical: 5,
  //   borderBottomColor: 'white',
  // },
  expedienteCard: {
    marginHorizontal: 10,
    backgroundColor: '#F5F5F8',
    height: 90,
    width: 350,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerModal: {
    flex: 1,
    backgroundColor: 'rgba(1,1,1, 0.5)',
    // justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    // padding: 10,
    // marginTop: 22
  },
  subcontainerModal: {
    height: '90%',
    width: '95%',
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 30,
    alignItems: 'center',
    // flexWrap: 'wrap',
  },
  headerContainerModal: {
    // height: 45,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
    // alignItems: 'center',
  },
  inputNota: {
    borderWidth: 0.3,
    borderRadius: 10,
    // height: 200,
    width: '20%',
    paddingHorizontal: 10,
    marginHorizontal: 10,
  },
  touchableCrearExpediente: {
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    padding: 10,
    marginTop: 20,
    // marginVertical: 10,
  },
  touchableCrearExpedienteTexto: {
    fontWeight: '100',
    fontSize: 26,
    color: '#24FF00',
    // margin: 10,
  },
  title: {
    color: '#000',
    fontSize: 20,
    // fontWeight: 'bold',
    marginVertical: 10,
    // marginHorizontal: 40,
    fontWeight: '100',
  },
  titleT: {
    color: '#000',
    fontSize: 40,
    // fontWeight: 'bold',
    marginVertical: 10,
    // marginHorizontal: 40,
    fontWeight: '100',
    textAlign: 'center',
  },
  appointmentDate: {
    fontSize: 27,
    color: 'white',
    fontWeight: '100',
  },
  patient: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    fontWeight: '100',
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
    backgroundColor: '#8FA4FF',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 85,
  },
});
