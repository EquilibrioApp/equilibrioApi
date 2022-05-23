import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Modal, Image } from 'react-native';
import { Avance } from '../interfaces/appInterfaces';
import {Styles} from '../theme/StyleTheme';
import {Inputstyles} from '../components/Input';


interface Props /* extends StackScreenProps<PotencialUsuarioStackParams, 'PotentialUserScreen'> */{
    avances: Avance;
}

export const AvancesCard = ({avances}: Props) => {

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
            <Text style={styles.name}>{'Fecha:'}</Text>
            <Text style={styles.fecha}>{avances.createdAt.substring(0, 10)}</Text>
            <Text style={styles.name}>{'\nObservación:'}</Text>
            <Text style={styles.info}>{avances.observacion}</Text>
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
        width: 190,
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
        fontSize: 18,
        fontWeight: '200',
        textAlign: 'justify',
    },
    fecha:{
        top: 10,
        fontSize: 30,
        fontWeight: '200',
        textAlign: 'center',
    },


});