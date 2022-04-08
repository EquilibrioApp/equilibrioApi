import { StackScreenProps } from '@react-navigation/stack';
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { loginStyles } from '../theme/LoginTheme';

interface Props extends StackScreenProps<any, any> { }

export const UserTypeScreen = ({ navigation }: Props) => {
    return (

        <>

            <View style={styles.container}>
                {/* Código para el logo */}
                <View style={{
                    alignItems: 'center'
                }}>
                    <Image
                        source={require('../assets/Logo.png')}
                        style={{
                            width: 80,
                            height: 110,
                            bottom: 10,
                        }}
                    />
                </View>

                <Text style={styles.tittle} >Seleccione un tipo de usuario para continuar</Text>

                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.buttonPaciente}
                    onPress={() => navigation.navigate('PatientRegisterScreen')}
                >
                    <Text style={styles.buttonText}>Paciente</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.buttonEspecialista}
                    onPress={() => navigation.navigate('RegisterScreen')}
                >
                    <Text style={styles.buttonText}>Especialista</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.replace('LoginScreen')}
                    activeOpacity={0.8}
                    style={loginStyles.buttonReturn}
                >
                    <Text style={loginStyles.buttonText}>Regresar</Text>
                </TouchableOpacity>

            </View>
        </>
    )
}

/* Estilos para los botones y los textos */

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tittle: {
        fontSize: 30,
        marginBottom: 20,
        paddingHorizontal: 20,
        textAlign: 'center',
        fontWeight: '100'
    },
    buttonPaciente: {
        fontSize: 30,
        marginBottom: 10,
        width: 200,
        height: 55,
        borderRadius: 50,
        backgroundColor: '#FFAB24'
    },
    buttonEspecialista: {
        fontSize: 30,
        marginBottom: 10,
        width: 200,
        height: 55,
        borderRadius: 50,
        backgroundColor: '#4265FF'
    },
    buttonAuxiliar: {
        fontSize: 30,
        marginBottom: 10,
        width: 200,
        height: 55,
        borderRadius: 50,
        backgroundColor: '#FE7D56'
    },
    buttonText: {
        fontSize: 30,
        fontWeight: '100',
        textAlign: 'center',
        color: 'white',
        top: 5
    }
});