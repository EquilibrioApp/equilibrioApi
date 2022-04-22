import {Picker} from '@react-native-picker/picker';
import {StackScreenProps} from '@react-navigation/stack';
import {forModalPresentationIOS} from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/CardStyleInterpolators';
import React, {useContext, useState} from 'react';
import {
  Keyboard,
  Modal,
  SafeAreaView,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import {Button, Image, SearchBar} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Inputstyles} from '../components/Input';
import {AuthContext} from '../context/AuthContext';
import {useForm} from '../hooks/usForms';
import {Styles} from '../theme/StyleTheme';

interface Props extends StackScreenProps<any, any> {}

export const SearchScreen = ({navigation}: Props) => {
  const [view, setView] = useState(false);

  const {signUp, errorMessage, removeError} = useContext(AuthContext);

  const {nombre, fechaNacimiento, sexo, altura, onChange} = useForm({
    nombre: '',
    fechaNacimiento: '',
    sexo: '',
    altura: '',
  });

  const [date, setDate] = useState('09-10-2021');

  const [selectedValue, setSelectedValue] = useState('');

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setView(true);
          }}>
          <Image
            style={{height: 50, width: 50, marginTop: 10}}
            source={require('../assets/expediente/Add.png')}
          />
        </TouchableOpacity>

        <Modal
          animationType="fade"
          onDismiss={() => console.log('close')}
          onShow={() => console.log('slow')}
          transparent
          visible={view}>
          <View style={Styles.container}>
            <View style={Styles.subcontainer}>
              <View style={Styles.headerContainer}>
                <TouchableOpacity onPress={() => setView(false)}>
                  <Image
                    source={require('../assets/Close.png')}
                    style={Styles.btnClose}
                  />
                </TouchableOpacity>
              </View>
              <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../assets/Logo.png')}
                    style={{
                      width: 80,
                      height: 110,
                      marginVertical:20
                    }}
                  />
                </View>
              <Text style={Inputstyles.title}>Nombre del paciente</Text>
              <TextInput
                style={Inputstyles.text}
                placeholder=" Nombre del paciente"
                placeholderTextColor="rgba(0, 0, 0, 0.54)"
                underlineColorAndroid="black"
                {...navigation} // Inherit any props passed to it; e.g., multiline, numberOfLines below
              />
              <Text style={Inputstyles.title}>Sexo</Text>
              <Picker
                selectedValue={selectedValue}
                style={{height: 50, width: 150, marginLeft: 50}}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedValue(itemValue)
                }>
                <Picker.Item label="Feminino" value="F" />
                <Picker.Item label="Maculino" value="M" />
              </Picker>

              <Text style={Inputstyles.title}>Altura (cm)</Text>
              <TextInput
                style={Inputstyles.text}
                placeholder=" Altura"
                placeholderTextColor="rgba(0, 0, 0, 0.54)"
                underlineColorAndroid="black"
                keyboardType="numeric"
                {...navigation} // Inherit any props passed to it; e.g., multiline, numberOfLines below
                maxLength={3}
              />

              <SafeAreaView style={styles.container}>
                <View style={styles.container}>
                  <Text style={Inputstyles.title}>Birth Date :</Text>
                  <DatePicker
                    style={styles.datePickerStyle}
                    date={date}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate="1923-01-01"
                    maxDate="2006-12-31"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateIcon: {
                        marginHorizontal: 20,
                        position: 'absolute',
                        right: -5,
                        top: 4,
                        marginLeft: 0,
                      },
                      dateInput: {
                        marginHorizontal:30,
                        height: 40,
                        width: '90%',
                        paddingHorizontal: 30,
                        borderColor: 'gray',
                        alignItems: 'flex-start',
                        borderWidth: 0,
                        borderBottomWidth: 1,
                      },
                      placeholderText: {
                        fontSize: 17,
                        color: 'gray',
                      },
                      dateText: {
                        fontSize: 17,
                      },
                    }}
                    onDateChange={date => {
                      setDate(date);
                    }}
                  />
                </View>
              </SafeAreaView>

              <Button
                title="Crear expediente"
                onPress={() => navigation.navigate('IndicesScreen')}
              />
            </View>
          </View>
        </Modal>

        <SectionList
          sections={[
            {title: 'D', data: ['Devin', 'Dan', 'Dominic']},
            {
              title: 'J',
              data: [
                'Jackson',
                'James',
                'Jillian',
                'Jimmy',
                'Joel',
                'John',
                'Julie',
              ],
            },
          ]}
          renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
          renderSectionHeader={({section}) => (
            <Text style={styles.sectionHeader}>{section.title}</Text>
          )}
          keyExtractor={(item, index) => 'key' + index}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 2,
  },
  datePickerStyle: {
    width: 230,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
