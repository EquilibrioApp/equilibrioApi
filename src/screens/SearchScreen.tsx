import {StackScreenProps} from '@react-navigation/stack';
import React, {useContext, useEffect, useState} from 'react';
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Button, Image} from 'react-native-elements';
import {Styles} from '../theme/StyleTheme';

import {ExpedientesContext} from '../context/ExpedientesContext';
import {ExpedientesStackParams} from '../navigator/ExpedientesNavigator';
import {useForm} from '../hooks/usForms';
import inicioApi from '../api/inicioApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-datepicker';

interface Props
  extends StackScreenProps<ExpedientesStackParams, 'SearchScreen'> {}

export const SearchScreen = ({navigation}: Props) => {
  const [view, setView] = useState(false);
  const [date, setDate] = useState('09-10-2021');
  const [selectedValue, setSelectedValue] = useState('');
  const {expediente, loadExpediente} = useContext(ExpedientesContext);

  const {id, nombre, sexo, birthDate, alturaPaciente, form, onChange} = useForm(
    {
      id: '',
      nombre: '',
      sexo: '',
      birthDate: '',
      alturaPaciente: '',
    },
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={0.8}
          style={{marginRight: 20}}
          onPress={() => {
            setView(true);
          }}>
          <Text>Agregar</Text>
        </TouchableOpacity>
      ),
    });
    loadExpediente();
  }, []);

  const onAddExpediente = async () => {
    console.log(form);
    try {

      const doctor = await AsyncStorage.getItem('id');
      if ((sexo.length && alturaPaciente.length && nombre.length && birthDate.length) !== 0) {
        const resp = await inicioApi.post(`/expediente`, {
          sexo,
          alturaPaciente,
          nombre,
          doctor,
          birthDate,
        });
        
        Alert.alert('Expediente registrado con exito');
        setView(false);
      }
      else{
        Alert.alert('Debe llenar todos los campos para poder ingresar un nuevo expediente');
      }
    } catch (error) {
      Alert.alert('Algo salio mal, intente de nuevo más tarde');
    }
  };

  return (
    <>
      <View style={styles.container}>
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
                <Text style={styles.titleT}>Nuevo expediente</Text>
                <Text style={styles.title}>Nombre del paciente</Text>
                <TextInput
                  style={styles.inputNota}
                  placeholder=" Nombre del paciente"
                  placeholderTextColor="rgba(0, 0, 0, 0.54)"
                  value={nombre}
                  onChangeText={value => onChange(value, 'nombre')}
                />
                <Text style={styles.title}>Sexo</Text>
                <Picker
                  selectedValue={selectedValue}
                  style={{height: 50, width: 150, marginLeft: 50}}
                  onValueChange={(itemValue, itemIndex) => {
                    setSelectedValue(itemValue);
                    onChange(itemValue, 'sexo');
                  }}>
                  <Picker.Item label="Feminino" value="F" />
                  <Picker.Item label="Maculino" value="M" />
                </Picker>

                <Text style={styles.title}>Altura (cm)</Text>
                <TextInput
                  style={styles.inputNota}
                  placeholder="Altura"
                  placeholderTextColor="rgba(0, 0, 0, 0.54)"
                  keyboardType="numeric"
                  maxLength={3}
                  value={alturaPaciente}
                  onChangeText={value => onChange(value, 'alturaPaciente')}
                />
                <SafeAreaView style={styles.container}>
                  <View style={styles.container}>
                    <Text style={styles.title}>Fecha de nacimiento:</Text>
                    <DatePicker
                      style={styles.datePickerStyle}
                      date={date}
                      mode="date"
                      placeholder="select date"
                      format="YYYY-MM-DD"
                      minDate="1923-01-01"
                      maxDate="2006-12-31"
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
                        onChange(date, 'birthDate');
                      }}
                    />
                  </View>
                </SafeAreaView>
                <TouchableOpacity
                  activeOpacity={0.2}
                  style={styles.touchableCrearExpediente}
                  onPress={onAddExpediente /* () => console.log(form) */}>
                  <Text style={styles.touchableCrearExpedienteTexto}>
                    Crear Expediente
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <FlatList
          data={expediente}
          keyExtractor={e => e.id}
          renderItem={({item}) => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate('MenuExpedienteScreen', {
                  id: item.id,
                  nombre: item.nombre,
                  birthDate: item.birthDate,
                  sexo: item.sexo,
                  alturaPaciente: item.alturaPaciente, //TODO VER ID DEL ESPECIALISTA
                })
              }>
              <View style={styles.expedienteCard}>
                <Text style={styles.expedienteName}>{item.nombre}</Text>
              </View>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        />
      </View>
    </>
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
  itemSeparator: {
    borderBottomWidth: 2,
    marginVertical: 5,
    borderBottomColor: 'white',
  },
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
    width: '90%',
    paddingHorizontal: 10,
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
  },
});
