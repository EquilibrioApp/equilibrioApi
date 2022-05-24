import React from 'react';
import {TextInput, Text, StyleSheet} from 'react-native';

function Input(title: any, value: any) {
  return (
    <>
      {/* <Text style={Inputstyles.title}>{title}</Text>
      <TextInput
        style={Inputstyles.text}
        value={value}
        // {...custom}
      /> */}
    </>
  );
}

{
  /* <Input
    title="Nombre del paciente"
    custum={
        value:{Nombre},
        onChangeText:em=> this.setState({Nombre:else,})
    }    
/> */
}

export default Input;

export const Inputstyles = StyleSheet.create({
  title: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    // marginVertical: 10,
    marginHorizontal: 40,
  },
  text: {
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#FFF',
    height: 50,
    width: '88%',
    paddingHorizontal: 30,
    color: '#000',
  },
});
