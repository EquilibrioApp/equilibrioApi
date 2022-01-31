import React from 'react'
import { ActivityIndicator, Image, View } from 'react-native';

export const LoadingScreen = () => {
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Image
                source={require('../assets/Logo.png')}
                style={{
                    width: 80,
                    height: 110,
                    bottom: 100,
                }}
            />
            <ActivityIndicator
                size={50}
                color="red"
            />
        </View>
    )
}
