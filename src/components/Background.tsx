import React from 'react';
import { View } from 'react-native';

export const Background = () => {
    return (
        <View
            style = {{
                position: 'absolute',
                backgroundColor: '#CACACA',
                width: 1000,
                height: 2000,
                /* Rota el contenedor para que se vea con una parte morada y la otra blanca */
                /* transform: [
                    {rotate: '-70deg'}
                ] */
            }}
        />
    )
}
