import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {expedienteStyles} from '../theme/ExpedienteTheme';
import {lyricsStyle} from '../theme/LyricsTheme';

interface Props extends StackScreenProps<any, any>{}

export const EquivalenciaScreen = ({navigation}: Props) => {
  return (
    <>
      <View style={expedienteStyles.cardPatiente}>
        <Text style={expedienteStyles.label}>Nombre: </Text>
        <Text style={expedienteStyles.label}>Nacimiento: </Text>
        <Text style={expedienteStyles.label}>Peso inicial: </Text>
        <Text style={expedienteStyles.label}>Peso actual: </Text>
      </View>

      <View style={{height: 150, width: 500, marginTop: 25}}>
        <ScrollView style={{left: 33, top: 200, width: 500}} horizontal={true}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={expedienteStyles.buttonBlue}
            onPress={() => navigation.navigate('IndicesScreen')}>
            <Text style={expedienteStyles.labelSubMenu}>Antropometría</Text>
            <Image
              style={expedienteStyles.image}
              source={require('../assets/expediente/Vector.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={expedienteStyles.buttonRed}
            onPress={() => navigation.navigate('CitaScreen')}>
            <Text style={expedienteStyles.labelSubMenu}>Cita</Text>
            <Image
              style={{height: 45, width: 45, top: -15}}
              source={require('../assets/expediente/Cita.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={expedienteStyles.buttonOrange}
            onPress={() => navigation.navigate('EquivalenciaScreen')}>
            <Text style={expedienteStyles.labelSubMenu}>Equivalencia</Text>
            <Image
              style={{height: 45, width: 45, top: -15}}
              source={require('../assets/expediente/HojaDeEquivalencia.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={expedienteStyles.buttonBlue}
            onPress={() => navigation.navigate('AvanceScreen')}>
            <Text style={expedienteStyles.labelSubMenu}>AvanceVSMeta</Text>
            <Image
              style={{height: 45, width: 45, top: -15}}
              source={require('../assets/expediente/Metas.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={expedienteStyles.buttonRed}
            onPress={() => navigation.navigate('NotasScreen')}>
            <Text style={expedienteStyles.labelSubMenu}>Notas</Text>
            <Image
              style={{height: 45, width: 45, top: -15}}
              source={require('../assets/expediente/Notas.png')}
            />
          </TouchableOpacity>
        </ScrollView>
      </View>

      <ScrollView style={expedienteStyles.box}>
        <ScrollView horizontal={true}>
          <Text style={lyricsStyle.labelBold}>Estatura:</Text>
          <TextInput
            placeholder=" Altura"
            placeholderTextColor="rgba(0, 0, 0, 0.54)"
            underlineColorAndroid="black"
            keyboardType="numeric"
            {...navigation} // Inherit any props passed to it; e.g., multiline, numberOfLines below
            maxLength={3}
          />
          <Text style={lyricsStyle.labelBold}>cm</Text>
        </ScrollView>
      </ScrollView>
    </>
  );
};
