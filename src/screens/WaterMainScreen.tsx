import React, { useState } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { WaterRender } from '../components/WaterRender';
import { Glass } from '../components/Glass';

export const WaterMainScreen = () => {

  const [glassOfWater, setGlassOfWater] = useState(0);
  const [littersOfWatter, setLittersOfWatter] = useState('0');
  
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.tittle}>Agua</Text>
        <Text style={styles.text}>Su consumo de agua ideal es de:</Text>
        <Text style={styles.text2}>{littersOfWatter}L</Text>
        <Text style={styles.text}>Equivalente a:</Text>
        <Text style={styles.text2}>{glassOfWater} vasos</Text>
        <Text style={styles.text}>(250 ml.)</Text>
        <View style={styles.checkboxContainer}>
        <WaterRender setGlassOfWater={setGlassOfWater} setLittersOfWatter={setLittersOfWatter}>
          {(glassesCounter) => (
            <Glass glassesCounter={glassesCounter}/>
            )}
            {/* <Glass /> */}
          </WaterRender>        
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 40,
    margin: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  tittle: {
    fontSize: 40,
    fontWeight: '100',
    color: 'dodgerblue',
    marginBottom: 20,
  },
  text: {
    fontWeight: '100',
    textAlign: 'justify',
    fontSize: 20,
  },
  text2: {
    fontWeight: '100',
    textAlign: 'justify',
    fontSize: 50,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginVertical: 30,
    alignItems: 'center',
  },
  checkbox: {
    width: 30,
    height: 30,
    marginRight: 20,
  },
});
