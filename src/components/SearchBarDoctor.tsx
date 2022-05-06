import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'

export const SearchBarDoctor = () => {
  return (
    <View style={styles.container}>
        <View style={styles.textBackground}>
            <TextInput
                placeholder = "C.P."
                style = {styles.textInput}
                keyboardType="numeric"
                maxLength={5}
            />
            
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'red',
        marginBottom: 30
    },
    textBackground:{
        backgroundColor: '#F3F1F3',
        borderRadius: 50,
        height: 40,
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
        
    },
    textInput:{
        flex: 1,
        fontSize: 18,
        fontWeight: '100',
        color: 'blue'
    }
});