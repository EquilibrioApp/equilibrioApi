import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export const ExcerciseMainScreen = () => {
  return (
    <>
    <View style={styles.container}>
        <Text>
            Excercise Screen
        </Text>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});