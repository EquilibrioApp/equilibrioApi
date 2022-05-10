import {StackScreenProps} from '@react-navigation/stack';
import React, {useState} from 'react';
import { Text, View } from 'react-native';
import {ExpedientesStackParams} from '../navigator/ExpedientesNavigator';
import {expedienteStyles} from '../theme/ExpedienteTheme';

interface Props
  extends StackScreenProps<ExpedientesStackParams, 'IndicesScreen'> {}

export const Card = ({route}: Props) => {
  const {id, nombre = '', birthDate, sexo, alturaPaciente} = route.params;

  var Sexo = '';
  if (sexo === 'F') {
    Sexo = 'Femenino';
  } else {
    Sexo = 'Masculino';
  }

  return (
    <>
      <View style={expedienteStyles.cardPatiente}>
        <Text style={expedienteStyles.label}>Numero: {id} </Text>
        <Text style={expedienteStyles.label}>Nombre: {nombre} </Text>
        <Text style={expedienteStyles.label}>Naciento: {birthDate}</Text>
        <Text style={expedienteStyles.label}>
          Sexo: {Sexo} Altura: {alturaPaciente}cm
        </Text>
        <Text style={expedienteStyles.label}>Peso inicial: Peso actual: </Text>
      </View>
    </>
  );
};
