import CheckBox from '@react-native-community/checkbox';
import React, {useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';

interface Props {
  glassesCounter: (value: boolean) => void;
}

export const Glass = ({glassesCounter}: Props) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/Vaso.jpg')}
        style={{
          width: 40,
          height: 70,
          resizeMode: 'stretch',
        }}
      />
      <CheckBox
        style={styles.checkbox}
        disabled={false}
        value={toggleCheckBox}
        onValueChange={newValue => {
          glassesCounter(!newValue);
          setToggleCheckBox(newValue);
        }}
        // value={toggleCheckBox}
        // onValueChange={newValue => setToggleCheckBox(newValue)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  checkboxContainer: {
    // flexDirection: 'row',
    marginVertical: 30,
    alignItems: 'center',
  },
  checkbox: {
    width: 30,
    height: 30,
  },
});
