import {Picker} from '@react-native-picker/picker';
import {StackScreenProps} from '@react-navigation/stack';
import {forModalPresentationIOS} from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/CardStyleInterpolators';
import React, {useContext, useEffect, useState} from 'react';
import {
  Keyboard,
  Modal,
  SafeAreaView,
  ScrollView,
  SectionList,
  StyleSheet,
  FlatList,
  Text,
  TextInput,
  View,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import {Button, Image, SearchBar} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Inputstyles} from '../components/Input';
import {Styles} from '../theme/StyleTheme';

import {ExpedientesContext} from '../context/ExpedientesContext';
import {ExpedientesStackParams} from '../navigator/ExpedientesNavigator';
import { useForm } from '../hooks/usForms';

interface Props extends StackScreenProps<ExpedientesStackParams, 'SearchScreen'> {}

export const SearchScreen = ({navigation}: Props) => {
  const [view, setView] = useState(false);

  const [date, setDate] = useState('09-10-2021');

  const [selectedValue, setSelectedValue] = useState('');

  const {expediente, loadExpediente} = useContext(ExpedientesContext);
  
  const{id, nombre, sexo, birthDate, alturaPaciente, form, onChange }= useForm({
    id:'',
    nombre:'',
    sexo:'',
    birthDate:'',
    alturaPaciente:'',
  })

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity activeOpacity={0.8} style={{marginRight:20}} onPress={() => {
          setView(true);
        }}>
          <Text>Agregar</Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <>
      <View style={styles.container}>
      
        <Modal
          animationType="fade"
          onDismiss={() => console.log('close')}
          onShow={() => console.log('slow')}
          transparent
          visible={view}>
          <View style={Styles.container}>
            <View style={Styles.subcontainer}>
              <View style={Styles.headerContainer}>
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
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../assets/Logo.png')}
                  style={{
                    width: 80,
                    height: 110,
                    marginVertical: 20,
                  }}
                />
              </View>
              <Text style={Inputstyles.title}>Nombre del paciente</Text>
              <TextInput
                style={Inputstyles.text}
                placeholder=" Nombre del paciente"
                placeholderTextColor="rgba(0, 0, 0, 0.54)"
                value={nombre}
                onChangeText={(value) => onChange(value, 'nombre')}
                underlineColorAndroid="black"
                {...navigation} // Inherit any props passed to it; e.g., multiline, numberOfLines below
              />
              <Text style={Inputstyles.title}>Sexo</Text>
              <Picker
                selectedValue={selectedValue}
                style={{height: 50, width: 150, marginLeft: 50}}
                onValueChange={(itemValue, itemIndex) => {
                  setSelectedValue(itemValue)
                  onChange(itemValue, 'sexo')
                }}>
                <Picker.Item label="Feminino" value="F" />
                <Picker.Item label="Maculino" value="M" />
              </Picker>

              <Text style={Inputstyles.title}>Altura (cm)</Text>
              <TextInput
                style={Inputstyles.text}
                placeholder=" Altura"
                placeholderTextColor="rgba(0, 0, 0, 0.54)"
                underlineColorAndroid="black"
                keyboardType="numeric"
                {...navigation} // Inherit any props passed to it; e.g., multiline, numberOfLines below
                maxLength={3}
                value={alturaPaciente}
                onChangeText={(value) => onChange(value, 'alturaPaciente')}
              />

              <SafeAreaView style={styles.container}>
                <View style={styles.container}>
                  <Text style={Inputstyles.title}>Fecha de nacimiento:</Text>
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
                      onChange(date, 'birthDate')
                    }}
                  />
                </View>
              </SafeAreaView>

              <Button
                title="Crear expediente"
                // onPress={() => navigation.navigate('MenuExpedienteScreen', {
                //   nombre:nombre,

                // })}
              />

              <Text>
                {JSON.stringify(form, null, 5 )}
              </Text>
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
  expedienteCard:{
    marginHorizontal: 10,
    backgroundColor: '#F5F5F8',
    height: 90,
    width: 350,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',

  }
});
