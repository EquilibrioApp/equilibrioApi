import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
} from 'react-native';
import {Avance, AvancesDto, Registro} from '../interfaces/appInterfaces';
import {Styles} from '../theme/StyleTheme';

interface Props /* extends StackScreenProps<PotencialUsuarioStackParams, 'PotentialUserScreen'> */ {
  preguntas: Registro;
}

export const RegistrosCard = ({preguntas}: Props) => {
  const [view, setView] = useState(false);

  return (
    <View>
      <TouchableOpacity activeOpacity={0.8} onPress={() => setView(true)}>
        <View style={styles.cardContainer}>
          <Text style={styles.name}>
            {preguntas.createdAt.substring(0, 10)}
          </Text>
          {/* <Text style={styles.info}>
                    {preguntas.observacion}
                </Text> */}
        </View>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        onDismiss={() => console.log('close')}
        onShow={() => console.log('slow')}
        transparent
        visible={view}>
        <View style={Styles.containerModalNotas}>
          <View style={Styles.subcontainerModalNotas}>
            <View style={Styles.headerContainerModalNotas}>
              <TouchableOpacity onPress={() => setView(false)}>
                <Image
                  source={require('../assets/Close.png')}
                  style={Styles.btnClose}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                // flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 20,
              }}></View>
            <Text style={styles.name}>{'Indices con Fecha:'}</Text>
            <Text style={styles.fecha}>
              {preguntas.createdAt.substring(0, 10)}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}>
              {preguntas.id !== null ? (
                <>
                  <View style={styles.indicesBox}>
                    <Text style={styles.subtitulo}> 1.- ¿Pudo comer de acuerdo al menú en el periodo de tiempo
          especificado?</Text>
                    <Text style={styles.info}>{preguntas.questionOne}</Text>
                  </View>
                  <View style={styles.indicesBox}>
                    <Text style={styles.subtitulo}>2.- ¿Cuál fue su última comida?</Text>
                    <Text style={styles.info}>{preguntas.questionTwo}</Text>
                  </View>
                  <View style={styles.indicesBox}>
                    <Text style={styles.subtitulo}>3.- Estado de ánimo y físico</Text>
                    <Text style={styles.info}>{preguntas.questionThree}</Text>
                  </View>
                  <View style={styles.indicesBox}>
                    <Text style={styles.subtitulo}>4.- ¿Ha sentido irritabilidad?</Text>
                    <Text style={styles.info}>{preguntas.questionFour}</Text>
                  </View>
                  <View style={styles.indicesBox}>
                    <Text style={styles.subtitulo}>5.- ¿Se ha sentido decaído?</Text>
                    <Text style={styles.info}>{preguntas.questionFive}</Text>
                  </View>
                  <View style={styles.indicesBox}>
                    <Text style={styles.subtitulo}>6.- ¿Ha sentido apatía?</Text>
                    <Text style={styles.info}>{preguntas.questionSix}</Text>
                  </View>
                  <View style={styles.indicesBox}>
                    <Text style={styles.subtitulo}>7.- ¿Ha sentido la necesidad de romper la dieta?</Text>
                    <Text style={styles.info}>{preguntas.questionSeven}</Text>
                  </View>
                  <View style={styles.indicesBox}>
                    <Text style={styles.subtitulo}>8.- ¿Siente cansancio?</Text>
                    <Text style={styles.info}>{preguntas.questionEight}</Text>
                  </View>
                  <View style={styles.indicesBox}>
                    <Text style={styles.subtitulo}>9.-¿Ha sentido dolores de cabeza?</Text>
                    <Text style={styles.info}>{preguntas.questionNine}</Text>
                  </View>
                  <View style={styles.indicesBox}>
                    <Text style={styles.subtitulo}>10.-¿Ha experimentado dolor de estómago?</Text>
                    <Text style={styles.info}>{preguntas.questionTen}</Text>
                  </View>
                  <View style={styles.indicesBox}>
                    <Text style={styles.subtitulo}>11.-¿Ha experimentado mareo?</Text>
                    <Text style={styles.info}>{preguntas.questionEleven}</Text>
                  </View>
                  <View style={styles.indicesBox}>
                    <Text style={styles.subtitulo}>12.-¿Ha dormido bien?</Text>
                    <Text style={styles.info}>{preguntas.questionTwelve}</Text>
                  </View>
                </>
              ) : (
                <Text style={styles.noData}>
                  No se tienen registros de esa fecha...
                </Text>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    backgroundColor: '#F5F5F5',
    height: 120,
    width: 290,
    marginBottom: 25,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    // top: 10,
    fontSize: 30,
    fontWeight: '200',
    textAlign: 'center',
  },
  info: {
    top: 10,
    fontSize: 20,
    fontWeight: '200',
    textAlign: 'justify',
  },
  fecha: {
    top: 10,
    fontSize: 30,
    fontWeight: '200',
    textAlign: 'center',
    marginBottom: 25,
  },
  indicesBox: {
    width: '46%',
    height: 100,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 6,
    padding: 10,
  },
  subtitulo: {
    fontWeight: '100',
    fontSize: 20,
    color: '#4265FF',
  },
  noData: {
    fontWeight: '100',
    fontSize: 30,
    marginTop: 100,
  },
});
