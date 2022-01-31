import React, { useContext } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export const ProtectedScreen = () => {

    const {token, logOut} = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <Text style={styles.tittle} >Protected Screen</Text>

            <Button
                title="Cerrar Sesión"
                color="red"
                onPress={logOut}
            />

            <Text>
                {token}
            </Text>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tittle: {
        fontSize: 20,
        marginBottom: 20
    }
});