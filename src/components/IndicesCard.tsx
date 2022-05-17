import React, { useState } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Modal, Image } from 'react-native';
import { Avance, AvancesDto } from '../interfaces/appInterfaces';
import {Styles} from '../theme/StyleTheme';


interface Props /* extends StackScreenProps<PotencialUsuarioStackParams, 'PotentialUserScreen'> */{
    avances: AvancesDto;
}

export const IndicesCard = ({avances}: Props) => {

    const [view, setView] = useState(false);

    

  return (
      <View>
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setView(true)}
        >
            <View style={styles.cardContainer}>
                <Text style={styles.name}>
                    {avances.createdAt.substring(0, 10)}
                </Text>
                {/* <Text style={styles.info}>
                    {avances.observacion}
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
                marginBottom: 20
              }}>
            </View>
            <Text style={styles.name}>{'Indices con Fecha:'}</Text>
            <Text style={styles.fecha}>{avances.createdAt.substring(0, 10)}</Text>
            <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
            {avances.indice !== null ?  
            (<>
              <View style={styles.indicesBox}>
                <Text style={styles.subtitulo}>IMC:</Text>
                <Text style={styles.info}>{avances.indice?.masaCorporal}</Text>
              </View>
              <View style={styles.indicesBox}>
                <Text style={styles.subtitulo}>Masa Grasa:</Text>
                <Text style={styles.info}>{avances.indice?.masaGrasa}</Text>
              </View>
              <View style={styles.indicesBox}>
                <Text style={styles.subtitulo}>Masa Magra:</Text>
                <Text style={styles.info}>{avances.indice?.masaMagra}</Text>
              </View>
              <View style={styles.indicesBox}>
                <Text style={styles.subtitulo}>Masa Muscular:</Text>
                <Text style={styles.info}>{avances.indice?.masaMuscular}</Text>
              </View>
              <View style={styles.indicesBox}>
                <Text style={styles.subtitulo}>Masa ósea:</Text>
                <Text style={styles.info}>{avances.indice?.masaOsea}</Text>
              </View>
              <View style={styles.indicesBox}>
                <Text style={styles.subtitulo}>Masa Residual:</Text>
                <Text style={styles.info}>{avances.indice?.masaResidual}</Text>
              </View>
            </>)
            :( <Text style={styles.noData}>No se tienen registros de esa fecha...</Text>)}
            </View>
          </View>
        </View>
      </Modal>  
      </View>

    
  )
}

const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 10,
        backgroundColor: '#F5F5F5',
        height: 120,
        width: 290,
        marginBottom: 25,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center'
    },
    name:{
        // top: 10,
        fontSize: 30,
        fontWeight: '200',
        textAlign: 'center'
    },
    info:{
        top: 10,
        fontSize: 20,
        fontWeight: '200',
        textAlign: 'justify',
    },
    fecha:{
        top: 10,
        fontSize: 30,
        fontWeight: '200',
        textAlign: 'center',
        marginBottom: 25
    },
    indicesBox:{
        width: '46%',
        height: 100,
        backgroundColor: '#F5F5F5',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 6,
        padding: 10,
    },
    subtitulo:{
        fontWeight: '100',
        fontSize: 20,
        color: '#4265FF',
    },
    noData:{
        fontWeight: '100',
        fontSize: 30,
        marginTop: 100
    },

});