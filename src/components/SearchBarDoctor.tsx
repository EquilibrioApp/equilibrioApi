import React, { useState } from 'react';
import { 
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface Props{
  setPostalCode: (value: string) => void;
}

export const SearchBarDoctor = ({setPostalCode}: Props) => {
  
  const [textValue, setTextValue] = useState('');

  // const debouncedValue = useDebouncedValue( textValue );

  // useEffect(() => {
    
  //   return () => {
  //     console.log({debouncedValue});
  //   }
  // }, [debouncedValue]);

  return (
    <View style={styles.container}>
      <View style={styles.textBackground}>
        <TextInput
          placeholder="C.P."
          style={styles.textInput}
          keyboardType="numeric"
          maxLength={5}
          value={textValue}
          onChangeText = {setTextValue}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.button}
          onPress={() => setPostalCode(textValue)}
        >
          <Text style={styles.buttonText}>Buscar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  textBackground: {
    backgroundColor: '#F3F1F3',
    borderRadius: 50,
    height: 40,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  textInput: {
    flex: 1,
    fontSize: 18,
    fontWeight: '100',
    color: 'blue',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  button: {
    borderWidth: 2,
    borderColor: 'black',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: 'black',
  },
});
