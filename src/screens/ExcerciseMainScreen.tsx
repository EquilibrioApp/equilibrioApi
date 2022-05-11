import React, {useState} from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export const ExcerciseMainScreen = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [customInterval, setCustomInterval] = useState<NodeJS.Timer>();

  const startTimer = () => {
    setCustomInterval(
      setInterval(() => {
        changeTime();
      }, 1000),
    );
  };

  const stopTimer = () => {
    if (customInterval) {
      clearInterval(customInterval);
    }
  };

  const clear = () => {
    stopTimer();
    setSeconds(0);
    setMinutes(0);
  };

  const changeTime = () => {
    setSeconds(prevState => {
      if (prevState + 1 == 60) {
        setMinutes(minutes + 1);
        return 0;
      }
      return prevState + 1;
    });
  };

  return (
    <>
      <View style={styles.container}>
        <Text>Excercise Screen</Text>
        <Text style={styles.textTimer}>
          {minutes < 10 ? '0' + minutes : minutes}:
          {seconds < 10 ? '0' + seconds : seconds}
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={startTimer}>
            <Text>Iniciar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={stopTimer}>
            <Text>Stop</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={clear}>
            <Text>Clear</Text>
          </TouchableOpacity>
        </View>

        {/* <StatusBar style="auto"/> */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTimer: {
    fontSize: 36,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  buttonContainer:{
    width: "50%",
    flexDirection: "row",
    justifyContent: "space-around", 
    marginTop: 10
  }
});
