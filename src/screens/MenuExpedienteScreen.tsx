import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import inicioApi from '../api/inicioApi';
import {Inputstyles} from '../components/Input';
import {useForm} from '../hooks/usForms';
import {Avance, AvancesResponseDto} from '../interfaces/appInterfaces';
import {ExpedientesStackParams} from '../navigator/ExpedientesNavigator';
import {expedienteStyles} from '../theme/ExpedienteTheme';
import {Styles} from '../theme/StyleTheme';

interface Props
  extends StackScreenProps<ExpedientesStackParams, 'MenuExpedienteScreen'> {}

export const MenuExpedienteScreen = ({route, navigation}: Props) => {
  const [view, setView] = useState(false);

  // const [avances, setAvances] = useState<Avance[]>([]);

  const {id, nombre = '', birthDate, sexo, alturaPaciente} = route.params;

  const altura = alturaPaciente;

  const actual = new Date();
  let actualYear = Number(actual.getUTCFullYear());
  const cumple = Number(birthDate.toString().substring(0, 4));
  const edad = actualYear - cumple;

  console.log('Muestra del id: ' + id);
  const {
    cadera1,
    cintura1,
    brazo1,
    pierna1,
    femoral1,
    biestiloideo1,
    cuello1,
    peso,
    tricipital,
    pectoral,
    bicipital,
    suprailiaca,
    subescupular,
    pantorrillaMedia,
    abdominal,
    musloMedio,
    midaxilar,
    observacion,
    form,
    onChange,
  } = useForm({
    avanceId: '',
    cadera1: '' /* Number */,
    cintura1: '' /* Number */,
    brazo1: '' /* Number */,
    pierna1: '' /* Number */,
    femoral1: '' /* Number */,
    altura: '' /* Number */,
    sexo: '',
    biestiloideo1: '' /* Number */,
    cuello1: '' /* Number */,
    edad: '' /* Number */,
    peso: '' /* Number */,
    tricipital: '',
    pectoral: '',
    bicipital: '',
    suprailiaca: '',
    subescupular: '',
    pantorrillaMedia: '',
    abdominal: '',
    musloMedio: '',
    midaxilar: '',
    observacion: ''
  });

  var Sexo = '';
  if (sexo === 'F') {
    Sexo = 'Femenino';
  } else {
    Sexo = 'Masculino';
  }

  const onAddAvance = async () =>{
    
    let cadera = Number(cadera1);
    let cintura = Number(cintura1);
    let brazo = Number(brazo1);
    let pierna = Number(pierna1);
    let femoral = Number(femoral1);
    let biestiloideo = Number(biestiloideo1);
    let cuello = Number(cuello1);

    try {
      const respNota = await inicioApi.post<AvancesResponseDto>(`/${id}/avance`, {
        observacion,
      });
      if (respNota.status !== 200) {
        Alert.alert('Algo ha salido mal, intente nuevamente');
      }
      const avanceId = respNota.data.id;
      
      const respCircunferencias = await inicioApi.post(`/circunferencias`, {
        avanceId, cadera, cintura, brazo, pierna, femoral, altura, sexo, biestiloideo, cuello,
      });
      
      const respIndices = await inicioApi.post(`/indices`, {
        avanceId, edad, sexo, peso, altura, cintura, cuello, cadera, biestiloideo, femoral,
      });

      const respPeso = await inicioApi.post(`/peso`, {
        avanceId, edad, sexo, peso, altura, cintura, cuello, cadera, biestiloideo, femoral,
      });

      const respPliegues = await inicioApi.post(`/pliegues`, {
        avanceId, tricipital, pectoral, bicipital, suprailiaca, subescupular, pantorrillaMedia, abdominal, musloMedio, midaxilar,
      });
      
      Alert.alert('Avance registrado con exito!');
      setView(false);
    } catch (error) {
      Alert.alert('Algo ha salido mal, intente nuevamente');
    }
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={0.8}
          style={{marginRight: 20}}
          onPress={() => {
            setView(true);
          }}>
          <Text>Registrar Avance</Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <View style={expedienteStyles.container}>
      <Modal animationType="slide" transparent={true} visible={view}>
        <SafeAreaView>
          <ScrollView>
            <View style={styles.modalContainer}>
              <View style={styles.modalView}>
              <View style={styles.headerContainerModal}>
                <TouchableOpacity onPress={() => setView(false)}>
                  <Image
                    source={require('../assets/Close.png')}
                    style={Styles.btnClose}
                  />
                </TouchableOpacity>
              </View>
                <Text style={styles.modalComplianceTittle}>
                  Registrar nuevo avance
                </Text>
                {/* -------------------------- Circunferencias ------------------------- */}
                <View style={styles.categoryContainer}>
                  <Text style={styles.modalComplianceSubTittle}>
                    Circunferencias
                  </Text>
                  <TextInput
                    style={styles.inputNota}
                    placeholder="Cadera"
                    placeholderTextColor="rgba(0, 0, 0, 0.54)"
                    keyboardType="numeric"
                    onChangeText={value => onChange(value, 'cadera1')}
                    value={cadera1}
                  />
                  <TextInput
                    style={styles.inputNota}
                    placeholder="Cintura"
                    placeholderTextColor="rgba(0, 0, 0, 0.54)"
                    keyboardType="numeric"
                    onChangeText={value => onChange(value, 'cintura1')}
                    value={cintura1}
                  />
                  <TextInput
                    style={styles.inputNota}
                    placeholder="Brazo"
                    placeholderTextColor="rgba(0, 0, 0, 0.54)"
                    keyboardType="numeric"
                    onChangeText={value => onChange(value, 'brazo1')}
                    value={brazo1}
                  />
                  <TextInput
                    style={styles.inputNota}
                    placeholder="Pierna"
                    placeholderTextColor="rgba(0, 0, 0, 0.54)"
                    keyboardType="numeric"
                    onChangeText={value => onChange(value, 'pierna1')}
                    value={pierna1}
                  />
                  <TextInput
                    style={styles.inputNota}
                    placeholder="Femoral"
                    placeholderTextColor="rgba(0, 0, 0, 0.54)"
                    keyboardType="numeric"
                    onChangeText={value => onChange(value, 'femoral1')}
                    value={femoral1}
                  />
                  <TextInput
                    style={styles.inputNota}
                    placeholder="Biestiloideo"
                    placeholderTextColor="rgba(0, 0, 0, 0.54)"
                    keyboardType="numeric"
                    onChangeText={value => onChange(value, 'biestiloideo1')}
                    value={biestiloideo1}
                  />
                  <TextInput
                    style={styles.inputNota}
                    placeholder="Cuello"
                    placeholderTextColor="rgba(0, 0, 0, 0.54)"
                    keyboardType="numeric"
                    onChangeText={value => onChange(value, 'cuello1')}
                    value={cuello1}
                  />
                </View>

                {/* -------------------------- Peso ------------------------- */}
                <View style={styles.categoryContainer}>
                  <Text style={styles.modalComplianceSubTittle}>Peso</Text>
                  <TextInput
                    style={styles.inputNota}
                    placeholder="Peso"
                    placeholderTextColor="rgba(0, 0, 0, 0.54)"
                    keyboardType="numeric"
                    onChangeText={value => onChange(value, 'peso')}
                    value={peso}
                  />
                </View>

                {/* -------------------------- Pliegues ------------------------- */}
                <View style={styles.categoryContainer}>
                  <Text style={styles.modalComplianceSubTittle}>Pliegues</Text>
                  <TextInput
                    style={styles.inputNota}
                    placeholder="Tricipital"
                    placeholderTextColor="rgba(0, 0, 0, 0.54)"
                    keyboardType="numeric"
                    onChangeText={value => onChange(value, 'tricipital')}
                    value={tricipital}
                  />
                  <TextInput
                    style={styles.inputNota}
                    placeholder="Pectoral"
                    placeholderTextColor="rgba(0, 0, 0, 0.54)"
                    keyboardType="numeric"
                    onChangeText={value => onChange(value, 'pectoral')}
                    value={pectoral}
                  />
                  <TextInput
                    style={styles.inputNota}
                    placeholder="Bicipital"
                    placeholderTextColor="rgba(0, 0, 0, 0.54)"
                    keyboardType="numeric"
                    onChangeText={value => onChange(value, 'bicipital')}
                    value={bicipital}
                  />
                  <TextInput
                    style={styles.inputNota}
                    placeholder="Suprailiaca"
                    placeholderTextColor="rgba(0, 0, 0, 0.54)"
                    keyboardType="numeric"
                    onChangeText={value => onChange(value, 'suprailiaca')}
                    value={suprailiaca}
                  />
                  <TextInput
                    style={styles.inputNota}
                    placeholder="Subescupular"
                    placeholderTextColor="rgba(0, 0, 0, 0.54)"
                    keyboardType="numeric"
                    onChangeText={value => onChange(value, 'subescupular')}
                    value={subescupular}
                  />
                  <TextInput
                    style={styles.inputNota}
                    placeholder="Pantorrilla Media"
                    placeholderTextColor="rgba(0, 0, 0, 0.54)"
                    keyboardType="numeric"
                    onChangeText={value => onChange(value, 'pantorrillaMedia')}
                    value={pantorrillaMedia}
                  />
                  <TextInput
                    style={styles.inputNota}
                    placeholder="Abdominal"
                    placeholderTextColor="rgba(0, 0, 0, 0.54)"
                    keyboardType="numeric"
                    onChangeText={value => onChange(value, 'abdominal')}
                    value={abdominal}
                  />
                  <TextInput
                    style={styles.inputNota}
                    placeholder="Muslo Medio"
                    placeholderTextColor="rgba(0, 0, 0, 0.54)"
                    keyboardType="numeric"
                    onChangeText={value => onChange(value, 'musloMedio')}
                    value={musloMedio}
                  />
                  <TextInput
                    style={styles.inputNota}
                    placeholder="Midaxilar"
                    placeholderTextColor="rgba(0, 0, 0, 0.54)"
                    keyboardType="numeric"
                    onChangeText={value => onChange(value, 'midaxilar')}
                    value={midaxilar}
                  />
                </View>

                {/* -------------------------- Agregar Nota ------------------------- */}
                
                  <Text style={styles.tituloModalAgregarNota}>
                    Nota del día:
                  </Text>
                  <TextInput
                    style={styles.inputNotaNota}
                    multiline={true}
                    placeholder="Introducir una nota..."
                    onChangeText={value => onChange(value, 'observacion')}
                    value={observacion}
                    // onSubmitEditing={onAddAvances}
                  />
                <TouchableOpacity
                  style={styles.continueButton}
                  onPress={onAddAvance}>
                  <Text
                    style={{fontSize: 20, fontWeight: '200', color: 'grey'}}>
                    Crear registro
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>

      <View style={expedienteStyles.cardPatiente}>
        <Text style={expedienteStyles.label}>
          {'Numero: ' +
            id?.substring(0, 13) +
            '\nNombre: ' +
            nombre +
            '\nNacimiento: ' +
            birthDate.toString().substring(0, 10) +
            '\nSexo: ' +
            Sexo +
            '\nAltura: ' +
            alturaPaciente +
            ' cm' +
            '\nPeso inicial: Peso actual:'}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={expedienteStyles.buttonBlue}
          onPress={() => {
            navigation.navigate('IndicesScreen', {
              id: id,
            });
          }}
        >
          <Text style={expedienteStyles.labelSubMenu}>Antropometría</Text>
          <Image
            style={expedienteStyles.image}
            source={require('../assets/expediente/Vector.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={expedienteStyles.buttonRed}
          // onPress={() => navigation.navigate('CitaScreen')}
        >
          <Text style={expedienteStyles.labelSubMenu}>Registros</Text>
          <Image
            style={{height: 45, width: 45, top: -15}}
            source={require('../assets/expediente/Cita.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={expedienteStyles.buttonOrange}
          // onPress={() => navigation.navigate('EquivalenciaScreen')}\
        >
          <Text style={expedienteStyles.labelSubMenu}>Equivalencia</Text>
          <Image
            style={{height: 45, width: 45, top: -15}}
            source={require('../assets/expediente/HojaDeEquivalencia.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={expedienteStyles.buttonBlue}
          // onPress={() => navigation.navigate('AvanceScreen')}
        >
          <Text style={expedienteStyles.labelSubMenu}>Avance Vs Meta</Text>
          <Image
            style={{height: 45, width: 45, top: -15}}
            source={require('../assets/expediente/Metas.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={expedienteStyles.buttonRed}
          onPress={() => {
            navigation.navigate('NotasScreen', {
              id: id,
            });
          }}>
          <Text style={expedienteStyles.labelSubMenu}>Notas</Text>
          <Image
            style={{height: 45, width: 45, top: -15}}
            source={require('../assets/expediente/Notas.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // top: 0,
    backgroundColor: 'rgba(0,0,0, .3)',
  },
  modalView: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    width: '96%',
    margin: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalComplianceTittle: {
    marginBottom: 50,
    color: 'dodgerblue',
    fontWeight: '200',
    textAlign: 'center',
    fontSize: 28,
  },
  modalComplianceSubTittle: {
    // marginBottom: 20,
    fontWeight: '100',
    textAlign: 'justify',
    marginBottom: 10,
    fontSize: 30,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginVertical: 30,
    alignItems: 'center',
  },
  checkbox: {
    width: 30,
    height: 30,
    marginRight: 20,
  },
  continueButton: {
    marginTop: 5,
    marginBottom: 10,
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#F5F5F5',
  },
  inputNota: {
    borderWidth: 0.3,
    borderRadius: 10,
    width: '40%',
    paddingHorizontal: 10,
    marginTop: 5,
    marginHorizontal: 5,
  },
  inputNotaNota: {
    borderWidth: 0.3,
    borderRadius: 10,
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 5,
    marginHorizontal: 5,
    marginBottom: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.3,
    borderColor: 'black',
    borderRadius: 20,
    padding: 10,
    margin: 10,
  },
  tituloModalAgregarNota: {
    fontWeight: '100',
    fontSize: 30,
    marginVertical: 10,
  },
  headerContainerModal: {
    // height: 45,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
    // alignItems: 'center',
  },
});
