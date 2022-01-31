import React from 'react'
import { Image, View } from 'react-native'

export const EquilibrioLogo = () => {
    return (
        <View style = {{
            alignItems: 'center'
        }}>
            <Image
                source = {require('../assets/Logo.png')}
                style = {{
                    width: 80,
                    height: 110,
                    top: 41
                }}
            />
        </View>
    )
}
