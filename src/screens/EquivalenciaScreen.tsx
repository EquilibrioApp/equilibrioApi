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
