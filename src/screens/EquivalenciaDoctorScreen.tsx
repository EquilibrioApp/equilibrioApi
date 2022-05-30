import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
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
import {StackScreenProps} from '@react-navigation/stack';
import {Styles} from '../theme/StyleTheme';
import {Picker} from '@react-native-picker/picker';
import {useForm} from '../hooks/usForms';
import inicioApi from '../api/inicioApi';
import {EquivalenciaDoctor} from '../interfaces/appInterfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props extends StackScreenProps<any, any> {}

export const EquivalenciaDoctorScreen = ({route, navigation}: Props) => {
  const [view, setView] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedSubGroup, setSelectedSubGroup] = useState('');
  const [selectedMeasure, setSelectedMeasure] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState('');

  const [equivalencia, setEquivalencia] = useState<EquivalenciaDoctor[]>([]);

  const {nombre, grupoAlimencio, subgrupo, medida, racion, form, onChange} =
    useForm({
      nombre: '',
      grupoAlimencio: '',
      subgrupo: '',
      medida: '',
      racion: '',
    });

  const onAddEquivalencia = async () => {
    try {
      if (nombre.length !== 0) {
        console.log('Lenght of Alimento: ' + nombre.length);
        console.log({nombre, grupoAlimencio, subgrupo, medida, racion});
        const doctor = await AsyncStorage.getItem('id');
        const respEqu = await inicioApi.post<EquivalenciaDoctor>(
          `/equivalencia`,
          {
            nombre,
            grupoAlimencio,
            subgrupo,
            racion,
            doctor
          },
        );
        console.log(respEqu.status);
        Alert.alert('Alimento registrado con exito.');
      } else {
        Alert.alert('El campo Nombre debe estar lleno.');
      }
    } catch (error) {
      Alert.alert('Algo salió mal.');
    }
  };

  const loadEquivalencia = async () =>{
    const idEspecialista = await AsyncStorage.getItem('id');
    console.log('idEspecialista: ' + idEspecialista);
    const resp = await inicioApi.get<EquivalenciaDoctor[]>(`/equivalencia/doctor/${idEspecialista}`); //TODO cambiar a expediente del especialist
    console.log('Equivalencia: '+ JSON.stringify(resp.data));
    setEquivalencia([...resp.data]);
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View
          style={{
            marginRight: 20,
            backgroundColor: '#F5F5F5',
            borderRadius: 15,
            padding: 8,
          }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setView(true);
            }}>
            <Text>Agregar alimento</Text>
          </TouchableOpacity>
        </View>
      ),
    });
    loadEquivalencia();
  }, [view]);

  return (
    <View style={styles.container}>
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
                  Agregar un nuevo alimento
                </Text>
                <Text style={styles.title}>Nombre del alimento</Text>
                <TextInput
                  style={styles.inputNota}
                  placeholder="Alimento..."
                  placeholderTextColor="rgba(0, 0, 0, 0.54)"
                  onChangeText={value => onChange(value, 'nombre')}
                  value={nombre}
                />
                <Text style={styles.title}>Grupo</Text>
                <Picker
                  selectedValue={selectedGroup}
                  style={{height: 50, width: '75%', marginLeft: 50}}
                  onValueChange={(itemValue, itemIndex) => {
                    setSelectedGroup(itemValue);
                    onChange(itemValue, 'grupoAlimencio');
                  }}>
                  <Picker.Item label="Seleccione un grupo" value="Frutas" />
                  <Picker.Item label="Verduras" value="Verduras" />
                  <Picker.Item label="Frutas" value="Frutas" />
                  <Picker.Item
                    label="Cereales y tubérculos"
                    value="Cereales y tubérculos"
                  />
                  <Picker.Item label="Leguminosas" value="Leguminosas" />
                  <Picker.Item
                    label="De origen animal"
                    value="De origen animal"
                  />
                </Picker>
                <Text style={styles.title}>Subgrupo</Text>
                <Picker
                  selectedValue={selectedSubGroup}
                  style={{height: 50, width: '75%', marginLeft: 50}}
                  onValueChange={(itemValue, itemIndex) => {
                    setSelectedSubGroup(itemValue);
                    onChange(itemValue, 'subgrupo');
                  }}>
                  <Picker.Item
                    label="Seleccione un subgrupo"
                    value="Sin grasa"
                  />
                  <Picker.Item label="Sin grasa" value="Sin grasa" />
                  <Picker.Item label="Con grasa" value="Con grasa" />
                  <Picker.Item
                    label="Bajo aporte de grasa"
                    value="Bajo aporte de grasa"
                  />
                  <Picker.Item
                    label="Alto aporte de grasa"
                    value="Alto aporte de grasa"
                  />
                  <Picker.Item label="Descremada" value="Descremada" />
                  <Picker.Item label="Semidescremada" value="Semidescremada" />
                  <Picker.Item label="Entera" value="Entera" />
                  <Picker.Item label="Con azúcar" value="Con azúcar" />
                  <Picker.Item label="Sin azúcar" value="Sin azúcar" />
                  <Picker.Item label="Con proteína" value="Con proteína" />
                  <Picker.Item label="Sin preteína" value="Sin preteína" />
                </Picker>
                <Text style={styles.title}>Medida</Text>
                <Picker
                  selectedValue={selectedMeasure}
                  style={{height: 50, width: '75%', marginLeft: 50}}
                  onValueChange={(itemValue, itemIndex) => {
                    setSelectedMeasure(itemValue);
                    onChange(itemValue, 'medida');
                  }}>
                  <Picker.Item label="Seleccione una medida" value="Taza(s)" />
                  <Picker.Item label="Taza(s)" value="Taza(s)" />
                  <Picker.Item
                    label="Pieza(s) chica(s)"
                    value="Pieza(s) chica(s)"
                  />
                  <Picker.Item label="Pieza(s)" value="Pieza(s)" />
                  <Picker.Item label="Cucharadita(s)" value="Cucharadita(s)" />
                  <Picker.Item label="Cucharada(s)" value="Cucharada(s)" />
                  <Picker.Item label="Rebanada(s)" value="Rebanada(s)" />
                  <Picker.Item label="Vaso chico" value="Vaso chico" />
                </Picker>
                <Text style={styles.title}>Cantidad</Text>
                <Picker
                  selectedValue={selectedQuantity}
                  style={{height: 50, width: '75%', marginLeft: 50}}
                  onValueChange={(itemValue, itemIndex) => {
                    setSelectedQuantity(itemValue);
                    onChange(itemValue, 'racion');
                  }}>
                  <Picker.Item label="Seleccione una cantidad" value="1/4" />
                  <Picker.Item label="1/4" value="1/4" />
                  <Picker.Item label="1/2" value="1/2" />
                  <Picker.Item label="3/4" value="3/4" />
                  <Picker.Item label="1" value="1" />
                  <Picker.Item label="1 1/4" value="1 1/4" />
                  <Picker.Item label="1 1/2" value="1 1/2" />
                  <Picker.Item label="1 3/4" value="1 3/4" />
                  <Picker.Item label="2" value="2" />
                  <Picker.Item label="2 1/4" value="2 1/4" />
                  <Picker.Item label="2 1/2" value="2 1/2" />
                  <Picker.Item label="2 3/4" value="2 3/4" />
                  <Picker.Item label="3" value="3" />
                  <Picker.Item label="3 1/4" value="3 1/4" />
                  <Picker.Item label="3 1/2" value="3 1/2" />
                  <Picker.Item label="3 3/4" value="3 3/4" />
                  <Picker.Item label="4" value="4" />
                  <Picker.Item label="4 1/4" value="4 1/4" />
                  <Picker.Item label="4 1/2" value="4 1/2" />
                  <Picker.Item label="4 3/4" value="4 3/4" />
                  <Picker.Item label="5" value="5" />
                  <Picker.Item label="5 1/4" value="5 1/4" />
                  <Picker.Item label="5 1/2" value="5 1/2" />
                  <Picker.Item label="5 3/4" value="5 3/4" />
                  <Picker.Item label="6" value="6" />
                  <Picker.Item label="6 1/4" value="6 1/4" />
                  <Picker.Item label="6 1/2" value="6 1/2" />
                  <Picker.Item label="6 3/4" value="6 3/4" />
                  <Picker.Item label="7" value="7" />
                  <Picker.Item label="7 1/4" value="7 1/4" />
                  <Picker.Item label="7 1/2" value="7 1/2" />
                  <Picker.Item label="7 3/4" value="7 3/4" />
                  <Picker.Item label="8" value="8" />
                  <Picker.Item label="8 1/4" value="8 1/4" />
                  <Picker.Item label="8 1/2" value="8 1/2" />
                  <Picker.Item label="8 3/4" value="8 3/4" />
                  <Picker.Item label="9" value="9" />
                  <Picker.Item label="9 1/4" value="9 1/4" />
                  <Picker.Item label="9 1/2" value="9 1/2" />
                  <Picker.Item label="9 3/4" value="9 3/4" />
                  <Picker.Item label="10" value="10" />
                  <Picker.Item label="10 1/4" value="10 1/4" />
                  <Picker.Item label="10 1/2" value="10 1/2" />
                  <Picker.Item label="10 3/4" value="10 3/4" />
                  <Picker.Item label="11" value="11" />
                  <Picker.Item label="11 1/4" value="11 1/4" />
                  <Picker.Item label="11 1/2" value="11 1/2" />
                  <Picker.Item label="11 3/4" value="11 3/4" />
                  <Picker.Item label="12" value="12" />
                </Picker>
                <TouchableOpacity
                  style={styles.continueButton}
                  onPress={onAddEquivalencia}>
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

      <FlatList
          data={equivalencia}
          keyExtractor={e => e.id}
          renderItem={({item}) => (
            <TouchableOpacity
              activeOpacity={0.8}
              // onPress={() =>}
              >
              <View style={styles.expedienteCard}>
                <Text style={styles.expedienteName}>{'Grupo alimenticio: ' + item.grupoAlimencio}</Text>
                <Text style={styles.expedienteName}>{'Alimento: '+item.nombre}</Text>
                
              </View>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        />
    </View>
  );
};

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    justifyContent: 'center',
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
  title: {
    color: '#000',
    fontSize: 20,
    // fontWeight: 'bold',
    marginTop: 15,
    // marginHorizontal: 40,
    fontWeight: '100',
  },
});
