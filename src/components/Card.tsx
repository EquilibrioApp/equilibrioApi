import React from 'react';
import { View } from 'react-native';

export const Card = () => {
    return (
        <View
            style = {{
                position: 'absolute',
                backgroundColor: 'white',
                top: 33,
                width: 1000,
                height: 900,
                borderTopLeftRadius: 75,
            }}
        />
    )
}