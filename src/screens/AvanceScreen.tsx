import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
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

interface Props
  extends StackScreenProps<ExpedientesStackParams, 'AvancesScreen'> {}

export const AvanceScreen = ({route, navigation}: Props) => {
  const [avance, setAvance] = useState<Avance[]>([]);
  const [meta, setMeta] = useState<Meta>({
    expedienteId: '1e6aaa45-989f-4405-911a-0122b77c5904',
    pesoMeta: '50',
    fechaMeta: '05-24',
  });

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
      const {id} = route.params;
      console.log('Expediente:' + id);
      const resp = await inicioApi.get<NutriCodigo>(`/expediente/${id}`);
      setAvance(resp.data.avances);
      console.log(JSON.stringify(resp.data.avances));
      setMeta(resp.data.meta);
      console.log(JSON.stringify(resp.data.meta));
      // const respAvance = await inicioApi.get<Avance[]>(
      //   `/${id}/avance`,
      // );
      // console.log('Avance' + respAvance.data);
      // setAvance(respAvance.data);
      // const respMeta = await inicioApi.get<NutriCodigo>(
      //   `/expediente/expe/${id}`,
      // );
      // console.log('Meta: ' + JSON.stringify(respMeta.data.meta) );
      // setMeta(respMeta.data.meta);
      return resp;
    } catch (error) {
      throw new Error('Error al obtener los datos del Paciente.');
    }
  };

  useEffect(() => {
    loadExpediente();
    // loadMeta();
  }, []);

  return (
    <>
      <View style={styles.container}>
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
        </View>

        <LineChart
          data={dataFecha}
          width={Dimensions.get('window').width} // from react-native
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
            marginVertical: 8,
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
    backgroundColor: '#C4C4C4',
    marginTop: 30,
    marginBottom: 30,
    padding: 10,
    borderRadius: 25,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
