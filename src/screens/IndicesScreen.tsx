import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import { FlatList, StyleSheet,Text,View } from 'react-native';
import inicioApi from '../api/inicioApi';
import { AvancesCard } from '../components/AvancesCard';
import { IndicesCard } from '../components/IndicesCard';
import { AvancesDto } from '../interfaces/appInterfaces';
import {ExpedientesStackParams} from '../navigator/ExpedientesNavigator';

interface Props
  extends StackScreenProps<ExpedientesStackParams, 'IndicesScreen'> {}

export const IndicesScreen = ({route}: Props) => {

  
  const [avances, setAvances] = useState<AvancesDto[]>([]);
  const {id} = route.params;
  const loadAvances = async (id: string | undefined) => {
    console.log('Id que se recibe en el ExpedientesContext: ' + id);
    const resp = await inicioApi.get<AvancesDto[]>(`/${id}/avance`); //TODO cambiar a expediente del especialist
    console.log('Respuesta de la api loadAvances: ' + resp.data);
    setAvances([...resp.data]);
  };

  useEffect(() => {
    loadAvances(id);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={avances}
        keyExtractor={e => e.id}
        renderItem={({item}) => <IndicesCard avances={item} />}
        // ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
