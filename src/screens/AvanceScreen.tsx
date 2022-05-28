import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import inicioApi from '../api/inicioApi';
import {useForm} from '../hooks/usForms';
import {Avance, Meta, NutriCodigo} from '../interfaces/PatientsInterfaces';
import {ExpedientesStackParams} from '../navigator/ExpedientesNavigator';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import DatePicker from 'react-native-datepicker';
import {Picker} from '@react-native-picker/picker';
import {Styles} from '../theme/StyleTheme';

interface Props
  extends StackScreenProps<ExpedientesStackParams, 'AvancesScreen'> {}

export const AvanceScreen = ({route, navigation}: Props) => {
  const {id} = route.params;
      
  const [avance, setAvance] = useState<Avance[]>([]);
  const [meta, setMeta] = useState<Meta>({
    expedienteId: '1e6aaa45-989f-4405-911a-0122b77c5904',
    pesoMeta: '50',
    fechaMeta: '05-24',
  });
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
  const [view, setView] = useState(false);
  const {expedienteId, pesoMeta, fechaMeta, form, onChange} = useForm(
    {
      expedienteId: id,
      pesoMeta: '',
      fechaMeta: '',
    },
  );

  // setAvance(id.)

  const dataFecha = {
    labels: [meta.fechaMeta.toString().substring(5, 10)],
    datasets: [
      {
        data: [parseInt(meta.pesoMeta)],
      },
    ],
  };

  avance.forEach(item => {
    dataFecha.labels.push(item.createdAt.toString().substring(5, 10));
    dataFecha.datasets[0].data.push(parseInt(item.peso.peso));
  });

  const loadExpediente = async () => {
    try {
      // const {id} = route.params;
      console.log('Expediente:' + id);
      const resp = await inicioApi.get<NutriCodigo>(`/expediente/expe/${id}`);
      console.log(JSON.stringify(resp.data.avances));
      setAvance(resp.data.avances);
      setMeta(resp.data.meta);
      console.log(JSON.stringify(resp.data.meta));
      const respAvance = await inicioApi.get<Avance[]>(`/${id}/avance`);
      console.log('Avance' + respAvance.data);
      setAvance(respAvance.data);
      const respMeta = await inicioApi.get<NutriCodigo>(
        `/expediente/expe/${id}`,
      );
      console.log('Meta: ' + JSON.stringify(respMeta.data.meta));
      setMeta(respMeta.data.meta);
      return resp;
    } catch (error) {
      console.log('Error: ' + JSON.stringify(error));
      Alert.alert('Ha sucedido un error al obtener los datos.');
    }
  };

  const onAddMeta = async () => {
    console.log(form);
    try {
      const resp = await inicioApi.post(`/meta/${id}`, {expedienteId, pesoMeta, fechaMeta});
      console.log(resp.status);
      if (resp.status.toString() === "201") {
        setView(false);
        Alert.alert('Se ha determinado una nueva cita con éxito.');
      }
      else{
        Alert.alert('Ha sucedido un error al crear la meta los datos.');
      }
    } catch (error) {
      console.log('Error: ' + JSON.stringify(error));
      Alert.alert('Ha sucedido un error inesperado.');
    }
  };

  // Obtener dias que faltan para cumplir la meta
  const actual = new Date();
  let actualYear = actual.toISOString().substring(0, 10);
  const fecha = meta.fechaMeta.substring(0, 10);
  const hoy = new Date(actualYear).getTime();
  const termino = new Date(fecha).getTime();
  const daysRemaining = (termino - hoy) / (1000 * 60 * 60 * 24);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={0.8}
          style={{marginRight: 20}}
          onPress={() => {
            setView(true);
          }}>
          <Text>Agregar Meta</Text>
        </TouchableOpacity>
      ),
    });
    loadExpediente();
    // loadMeta();
  }, [view]);

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
                <Text style={styles.titleT}>Definir nueva meta</Text>
                <Text style={styles.title}>Peso Meta</Text>
                <TextInput
                  style={styles.inputNota}
                  placeholder="Peso a alcanzar"
                  placeholderTextColor="rgba(0, 0, 0, 0.54)"
                  value={pesoMeta}
                  onChangeText={value => onChange(value, 'pesoMeta')}
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
                      minDate="2022-05-01"
                      maxDate="2025-12-31"
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
                        onChange(date, 'fechaMeta');
                      }}
                    />
                  </View>
                </SafeAreaView>
                <TouchableOpacity
                  activeOpacity={0.2}
                  style={styles.touchableCrearExpediente}
                  onPress={onAddMeta}
                  >
                  <Text style={styles.touchableCrearExpedienteTexto}>
                    Definir Meta
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.tittle}>Avances</Text>
        </View>
        <View style={styles.cardPatiente}>
          <Text style={styles.label}>
            {'Fecha meta: ' +
              meta.fechaMeta.toString().substring(0, 10) +
              '\nPeso meta: ' +
              meta.pesoMeta +
              'kg'}
          </Text>
          <Text style={styles.label}>
            {'Días que faltan para cumplir la meta: ' + daysRemaining}
          </Text>
        </View>

        <LineChart
          data={dataFecha}
          width={Dimensions.get('window').width - 15} // from react-native
          height={220}
          yAxisLabel=""
          yAxisSuffix="kg"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          bezier
          style={{
            marginVertical: 10,
            borderRadius: 16,
          }}
        />

        <FlatList
          data={avance}
          keyExtractor={e => e.id}
          renderItem={({item}) => (
            <View style={Style.expedienteCard}>
              <Text style={Style.expedienteName}>
                {'Fecha: ' + item.createdAt.toString().substring(0, 10)}
              </Text>
              <Text style={Style.expedienteName}>
                {'Peso: ' + item.peso.peso + 'kg'}
              </Text>
            </View>
          )}
          ItemSeparatorComponent={() => <View style={Style.itemSeparator} />}
        />
      </View>
    </>
  );
};

const Style = StyleSheet.create({
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  tittle: {
    fontSize: 40,
    fontWeight: '100',
    color: 'dodgerblue',
    marginBottom: 20,
  },
  text: {
    fontWeight: '100',
    textAlign: 'justify',
    fontSize: 20,
  },
  text2: {
    fontWeight: '100',
    textAlign: 'justify',
    fontSize: 50,
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
  label: {
    // fontFamily: 'Comfortaa',
    fontSize: 30,
    fontWeight: '100',
    color: '#000000',
  },
  cardPatiente: {
    width: 370,
    backgroundColor: '#F5F5F5',
    marginTop: 30,
    marginBottom: 30,
    padding: 10,
    borderRadius: 25,
    flexDirection: 'row',
    flexWrap: 'wrap',
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
    textAlign: 'center',
    marginVertical: 10,
    fontWeight: '100',
  },
});
