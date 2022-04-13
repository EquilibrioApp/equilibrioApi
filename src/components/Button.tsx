import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

function Button(title: any, action: any) {
  return (
    <TouchableOpacity style={styles.btn} onPress={action}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

//<Button title='Crear expediente' onPress={()=>navigation.navigate('IndicesScreen')} />

export default Button;

const styles = StyleSheet.create({
  btn: {
    borderWidth: 1,
    borderColor: '#FFF',
    height: 45,
    width: '100%',
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});
