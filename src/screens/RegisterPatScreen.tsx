import {Picker} from '@react-native-picker/picker';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, View, ViewBase, Image} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {Inputstyles} from '../components/Input';
import {useForm} from '../hooks/usForms';
import {PacienteStackParams} from '../navigator/PacienteNavigator';
interface Props
  extends StackScreenProps<PacienteStackParams, 'RegisterPatScreen'> {}

export const RegisterPatScreen = ({navigation}: Props) => {
  const [view, setView] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [isSelected, setSelection] = useState(false);
  const [count, setCount] = useState(0);
  //const {addRegistros} = useContext(ExpedientesContext);

  const onPressFeliz = () => setCount(prevCount => 1);
  const onPressMareado = () => setCount(prevCount => 2);
  const onPressTriste = () => setCount(prevCount => 3);
  const onPressCansado = () => setCount(prevCount => 4);
  const onPressEnojado = () => setCount(prevCount => 5);

  const {
    preguntaUno,
    preguntaDos,
    preguntaTres,
    preguntaCuatro,
    preguntaCinco,
    preguntaSeis,
    preguntaSiete,
    preguntaOcho,
    preguntaNueve,
    preguntaDiez,
    preguntaOnce,
    preguntaDoce,
    form,
    onChange,
  } = useForm({
    preguntaUno: '', //'',
    preguntaDos: '',
    preguntaTres: '',
    preguntaCuatro: '',
    preguntaCinco: '',
    preguntaSeis: '',
    preguntaSiete: '',
    preguntaOcho: '',
    preguntaNueve: '',
    preguntaDiez: '',
    preguntaOnce: '',
    preguntaDoce: '',
    expediente: '',
  });

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={0.8}
          style={{marginRight: 20}}
          onPress={() => {
            //TODO guardar informacion y enviar a la pantalla de menu
            setView(true);
          }}>
          <Text>Guardar</Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  var onPressButton = '';

  return (
    <>
      <ScrollView style={{marginVertical: 50}}>
        <Text style={Inputstyles.title}>
          1.- ¿Pudo comer de acuerdo al menú en el periodo de tiempo
          especificado?{' '}
        </Text>
        <Picker
          selectedValue={selectedValue}
          style={{height: 50, width: 100, marginLeft: 40}}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedValue(itemValue);
            onChange(itemValue, 'preguntaUno');
          }}>
          <Picker.Item label="Si" value="True" />
          <Picker.Item label="No" value="False" />
        </Picker>

        <Text style={Inputstyles.title}>2.- ¿Cuál fue su última comida? </Text>
        <TextInput
          style={Inputstyles.text}
          placeholder=" Ej. 2 Hot dog"
          placeholderTextColor="rgba(0, 0, 0, 0.54)"
          underlineColorAndroid="black"
          keyboardType="name-phone-pad"
          value={preguntaDos}
          onChangeText={value => onChange(value, 'preguntaDos')}
          {...navigation}
        />

        <Text style={Inputstyles.title}>3.- Estado de ánimo y físico</Text>
        <ScrollView
          horizontal={true}
          style={{
            marginLeft: 60,
            marginTop: 5,
            height: 100,
            marginHorizontal: -50,
          }}>
          <TouchableOpacity onPress={onPressFeliz}
          >
            <Image
              source={require('../assets/emociones/feliz.png')}
              style={{height: 40, width: 40}}
            />
            <Text style={styles.text}>Feliz</Text>
            {/* onChange(count, 'preguntaTres') */}
          </TouchableOpacity>
          
          {/* <ScrollView>
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
          </ScrollView> */}
        </ScrollView>
        <View style={styles.container}></View>

        <Text style={Inputstyles.title}>4.- ¿Ha sentido irritabilidad?</Text>
        <Picker
          selectedValue={selectedValue}
          style={{height: 50, width: 100, marginLeft: 40}}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedValue(itemValue);
            onChange(itemValue, 'preguntaCuatro');
          }}>
          <Picker.Item label="Si" value="True" />
          <Picker.Item label="No" value="False" />
        </Picker>

        <Text style={Inputstyles.title}>5.- ¿Se ha sentido decaído?</Text>
        <Picker
          selectedValue={selectedValue}
          style={{height: 50, width: 100, marginLeft: 40}}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedValue(itemValue);
            onChange(itemValue, 'preguntaCinco');
          }}>
          <Picker.Item label="Si" value="True" />
          <Picker.Item label="No" value="False" />
        </Picker>

        <Text style={Inputstyles.title}>6.- ¿Ha sentido apatía?</Text>
        <Picker
          selectedValue={selectedValue}
          style={{height: 50, width: 100, marginLeft: 40}}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedValue(itemValue);
            onChange(itemValue, 'preguntaSeis');
          }}>
          <Picker.Item label="Si" value="True" />
          <Picker.Item label="No" value="False" />
        </Picker>

        <Text style={Inputstyles.title}>
          7.- ¿Ha sentido la necesidad de romper la dieta?
        </Text>
        <Picker
          selectedValue={selectedValue}
          style={{height: 50, width: 100, marginLeft: 40}}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedValue(itemValue);
            onChange(itemValue, 'preguntaSiete');
          }}>
          <Picker.Item label="Si" value="True" />
          <Picker.Item label="No" value="False" />
        </Picker>
        <Text style={Inputstyles.title}>8.- ¿Siente cansancio?</Text>
        <Picker
          selectedValue={selectedValue}
          style={{height: 50, width: 100, marginLeft: 40}}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedValue(itemValue);
            onChange(itemValue, 'preguntaOcho');
          }}>
          <Picker.Item label="Si" value="True" />
          <Picker.Item label="No" value="False" />
        </Picker>
        <Text style={Inputstyles.title}>9.-¿Ha sentido dolores de cabeza?</Text>
        <Picker
          selectedValue={selectedValue}
          style={{height: 50, width: 100, marginLeft: 40}}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedValue(itemValue);
            onChange(itemValue, 'preguntaNueve');
          }}>
          <Picker.Item label="Si" value="True" />
          <Picker.Item label="No" value="False" />
        </Picker>
        <Text style={Inputstyles.title}>
          10.-¿Ha experimentado dolor de estómago?
        </Text>
        <Picker
          selectedValue={selectedValue}
          style={{height: 50, width: 100, marginLeft: 40}}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedValue(itemValue);
            onChange(itemValue, 'preguntaDiez');
          }}>
          <Picker.Item label="Si" value="True" />
          <Picker.Item label="No" value="False" />
        </Picker>
        <Text style={Inputstyles.title}>11.-¿Ha experimentado mareo?</Text>
        <Picker
          selectedValue={selectedValue}
          style={{height: 50, width: 100, marginLeft: 40}}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedValue(itemValue);
            onChange(itemValue, 'preguntaOnce');
          }}>
          <Picker.Item label="Si" value="True" />
          <Picker.Item label="No" value="False" />
        </Picker>
        <Text style={Inputstyles.title}>12.-¿Ha dormido bien?</Text>
        <Picker
          selectedValue={selectedValue}
          style={{height: 50, width: 100, marginLeft: 40}}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedValue(itemValue);
            onChange(itemValue, 'preguntaDoce');
          }}>
          <Picker.Item label="Si" value="True" />
          <Picker.Item label="No" value="False" />
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
    fontSize: 16,
    fontWeight: 'bold',
    // marginVertical: 10,
    marginHorizontal: 40,
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
