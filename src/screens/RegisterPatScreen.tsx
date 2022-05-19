import {Picker} from '@react-native-picker/picker';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, View, ViewBase, Image, Switch} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import inicioApi from '../api/inicioApi';
// import {styles} from '../components/Input'; //TODO descomentar
import {useForm} from '../hooks/usForms';
import {Patient, Registro} from '../interfaces/appInterfaces';
import {PatientStackParams} from '../navigator/PatientNavigator';

interface Props
  extends StackScreenProps<PatientStackParams, 'RegisterPatScreen'> {}

export const RegisterPatScreen = ({route, navigation}: Props) => {
  const [registro, setRegistro] = useState<Registro>();
  const [user, setUser] = useState<Patient>();

  const [view, setView] = useState(false);
  const [selectedValue, setSelectedValue] = useState(false);
  const [selectedValue2, setSelectedValue2] = useState('');
  const [selectedValue3, setSelectedValue3] = useState(false);
  const [selectedValue4, setSelectedValue4] = useState(false);
  const [selectedValue5, setSelectedValue5] = useState(false);
  const [selectedValue6, setSelectedValue6] = useState(false);
  const [selectedValue7, setSelectedValue7] = useState(false);
  const [selectedValue8, setSelectedValue8] = useState(false);
  const [selectedValue9, setSelectedValue9] = useState(false);
  const [selectedValue10, setSelectedValue10] = useState(false);
  const [selectedValue11, setSelectedValue11] = useState(false);
  const [selectedValue12, setSelectedValue12] = useState(false);
  const [isSelected, setSelection] = useState(false);
  const [count, setCount] = useState(0);
  //const {addRegistros} = useContext(ExpedientesContext);;

  const {
    questionOne,
    questionTwo,
    questionThree,
    questionFour,
    questionFive,
    questionSix,
    questionSeven,
    questionEight,
    questionNine,
    questionTen,
    questionEleven,
    questionTwelve,
    expediente,
    form,
    onChange,
  } = useForm({
    questionOne: false, //'',
    questionTwo: '',
    questionThree: 0,
    questionFour: false,
    questionFive: false,
    questionSix: false,
    questionSeven: false,
    questionEight: false,
    questionNine: false,
    questionTen: false,
    questionEleven: false,
    questionTwelve: false,
    expediente: '',
  });

  const addRegister = async () => {
    try {
      const {UserId} = route.params;
      const respEx = await inicioApi.get<Patient>(`/patient/${UserId}`);
      console.log('Exp: ' + respEx.data.nutriCodigo.id);
      const expediente = respEx.data.nutriCodigo.id;
      setUser(respEx.data);
      onChange(expediente, 'expediente');
      console.log('pregunta ' + questionTwo);
      const resp = await inicioApi.post<Registro>(`/registro`, {
        questionOne,
        questionTwo,
        questionThree,
        questionFour,
        questionFive,
        questionSix,
        questionSeven,
        questionEight,
        questionNine,
        questionTen,
        questionEleven,
        questionTwelve,
        expediente,
      });
      console.log(resp.status);
    } catch (error) {
      throw new Error('Error al registrar los datos del registro.');
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={0.8}
          style={{marginRight: 20}}
          onPress={() => {
            //TODO guardar informacion y enviar a la pantalla de menu
            // setView(true);
            addRegister();
          }}>
          <Text>Guardar</Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <>
      <ScrollView style={{marginVertical: 5, marginLeft:20, marginRight:20}}>
        <Text style={styles.title}>
          1.- ¿Pudo comer de acuerdo al menú en el periodo de tiempo
          especificado?{' '}
        </Text>
        <Picker
          selectedValue={selectedValue}
          style={{height: 50, width: 150, marginLeft: 40}}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedValue(itemValue);
            onChange(itemValue, 'questionOne');
          }}>
          <Picker.Item label="Si" value={true} />
          <Picker.Item label="No" value={false} />
        </Picker>

        <Text style={styles.title}>2.- ¿Cuál fue su última comida? </Text>
        <TextInput
          style={styles.text}
          placeholder=" Ej. 2 Hot dog"
          placeholderTextColor="rgba(0, 0, 0, 0.54)"
          underlineColorAndroid="black"
          keyboardType="name-phone-pad"
          onChangeText={value => onChange(value, 'questionTwo')}
          value={questionTwo}
          // {...navigation}
        />

        <Text style={styles.title}>3.- Estado de ánimo y físico</Text>
        <ScrollView
          horizontal={true}
          style={{
            marginLeft: 20,
            marginTop: 5,
            height: 100,
            marginHorizontal: -50,
          }}>
          <ScrollView>
            <Image
              source={require('../assets/emociones/feliz.png')}
              style={{height: 40, width: 40}}
            />
            <Text style={styles.text}>Feliz</Text>
          </ScrollView>
          <ScrollView>
            <Image
              source={require('../assets/emociones/mareado.png')}
              style={{height: 40, width: 40, marginLeft: 15}}
            />
            <Text style={styles.text}> Mareado</Text>
          </ScrollView>
          <ScrollView>
            <Image
              source={require('../assets/emociones/triste.png')}
              style={{height: 40, width: 40, marginLeft: 15}}
            />
            <Text style={styles.text}> Triste</Text>
          </ScrollView>
          <ScrollView>
            <Image
              source={require('../assets/emociones/cansado.png')}
              style={{height: 40, width: 40, marginLeft: 15}}
            />
            <Text style={styles.text}>Cansado</Text>
          </ScrollView>
          <ScrollView>
            <Image
              source={require('../assets/emociones/enojado.png')}
              style={{height: 40, width: 40, marginLeft: 15}}
            />
            <Text style={styles.text}> Enojado</Text>
          </ScrollView>
        </ScrollView>
        <Picker
          selectedValue={selectedValue3}
          style={{height: 50, width: 150, marginLeft: 40}}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedValue3(itemValue);
            onChange(itemValue, 'questionThree');
          }}>
          <Picker.Item label="Feliz" value="1" />
          <Picker.Item label="Mareado" value="2" />
          <Picker.Item label="Triste" value="3" />
          <Picker.Item label="Cansado" value="4" />
          <Picker.Item label="Angry" value="5" />
        </Picker>

        <Text style={styles.title}>4.- ¿Ha sentido irritabilidad?</Text>
        <Picker
          selectedValue={selectedValue4}
          style={{height: 50, width: 150, marginLeft: 40}}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedValue4(itemValue);
            onChange(itemValue, 'questionFour');
          }}>
          <Picker.Item label="Si" value={true} />
          <Picker.Item label="No" value={false} />
        </Picker>

        <Text style={styles.title}>5.- ¿Se ha sentido decaído?</Text>
        <Picker
          selectedValue={selectedValue5}
          style={{height: 50, width: 100, marginLeft: 40}}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedValue5(itemValue);
            onChange(itemValue, 'questionFive');
          }}>
          <Picker.Item label="Si" value={true} />
          <Picker.Item label="No" value={false} />
        </Picker>

        <Text style={styles.title}>6.- ¿Ha sentido apatía?</Text>
        <Picker
          selectedValue={selectedValue6}
          style={{height: 50, width: 150, marginLeft: 40}}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedValue6(itemValue);
            onChange(itemValue, 'questionSix');
          }}>
          <Picker.Item label="Si" value={true} />
          <Picker.Item label="No" value={false} />
        </Picker>

        <Text style={styles.title}>
          7.- ¿Ha sentido la necesidad de romper la dieta?
        </Text>
        <Picker
          selectedValue={selectedValue7}
          style={{height: 50, width: 150, marginLeft: 40}}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedValue7(itemValue);
            onChange(itemValue, 'questionSeven');
          }}>
          <Picker.Item label="Si" value={true} />
          <Picker.Item label="No" value={false} />
        </Picker>

        <Text style={styles.title}>8.- ¿Siente cansancio?</Text>
        <Picker
          selectedValue={selectedValue8}
          style={{height: 50, width: 150, marginLeft: 40}}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedValue8(itemValue);
            onChange(itemValue, 'questionEight');
          }}>
          <Picker.Item label="Si" value={true} />
          <Picker.Item label="No" value={false} />
        </Picker>

        <Text style={styles.title}>9.-¿Ha sentido dolores de cabeza?</Text>
        <Picker
          selectedValue={selectedValue9}
          style={{height: 50, width: 150, marginLeft: 40}}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedValue9(itemValue);
            onChange(itemValue, 'questionNine');
          }}>
          <Picker.Item label="Si" value={true} />
          <Picker.Item label="No" value={false} />
        </Picker>

        <Text style={styles.title}>
          10.-¿Ha experimentado dolor de estómago?
        </Text>
        <Picker
          selectedValue={selectedValue10}
          style={{height: 50, width: 150, marginLeft: 40}}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedValue10(itemValue);
            onChange(itemValue, 'questionTen');
          }}>
          <Picker.Item label="Si" value={true} />
          <Picker.Item label="No" value={false} />
        </Picker>

        <Text style={styles.title}>11.-¿Ha experimentado mareo?</Text>
        <Picker
          selectedValue={selectedValue11}
          style={{height: 50, width: 100, marginLeft: 40}}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedValue11(itemValue);
            onChange(itemValue, 'questionEleven');
          }}>
          <Picker.Item label="Si" value={true} />
          <Picker.Item label="No" value={false} />
        </Picker>

        <Text style={styles.title}>12.-¿Ha dormido bien?</Text>
        <Picker
          selectedValue={selectedValue12}
          style={{height: 50, width: 150, marginLeft: 40}}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedValue12(itemValue);
            onChange(itemValue, 'questionTwelve');
          }}>
          <Picker.Item label="Si" value={true} />
          <Picker.Item label="No" value={false} />
        </Picker>
        <Text>{JSON.stringify(form, null, 5)}</Text>
      </ScrollView>
    </>
  );
};

// __________________________  Comida __________________________
// 1.- ¿Pudo comer de acuerdo al menú en el periodo de tiempo especificado?   Si/No
// 2.- Mostrarán a forma de cuadrados las categorías que se tienen de
//     comidas fuera de la dieta                                              Strign

//   _________________________ Emociones _________________________
// 3.- Esquema del 1 al 5                                                     1-5
// 4.- ¿Ha sentido irritabilidad?                                             Si/No
// 5.- ¿Se ha sentido decaído?                                                Si/No
// 6.- ¿Ha sentido apatía?                                                    Sí/No
// 7.- ¿Ha sentido la necesidad de romper la dieta?                           Sí/No/En ocasion
//   __________________________ Fisicos __________________________
// 8.- ¿Siente cansancio?                                                     Sí/No/En ocasion
// 9.-¿Ha sentido dolores de cabeza?                                          Sí/No/En ocasion
// 10.-¿Ha experimentado dolor de estómago?                                   Sí/No/En ocasion
// 11.-¿Ha experimentado mareo?                                               Sí/No/En ocasion
// 12.-¿Ha dormido bien?                                                      Sí/No/En ocasion

export const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  title: {
    color: '#000',
    fontSize: 20,
    // fontWeight: 'bold',
    marginVertical: 10,
    // marginHorizontal: 40,
    fontWeight: 'normal',
  },
  text: {
    marginHorizontal: 0,
    borderWidth: 1,
    borderColor: '#FFF',
    height: 20,
    width: '100%',
    paddingHorizontal: 5,
    color: '#000',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    margin: 8,
  },
});
