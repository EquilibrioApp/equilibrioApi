import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {Image, ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import { expedienteStyles } from '../theme/ExpedienteTheme';

// // interface Props extends StackScreenProps<any, any> {}{navigation}: Props

// export const MenuExpediente = () => {

//   const navigator = useNavigation();

//   return (
//     <>
//       <View style={expedienteStyles.cardPatiente}>
//         <Text style={expedienteStyles.label}>Nombre: </Text>
//         <Text style={expedienteStyles.label}>Nacimiento: </Text>
//         <Text style={expedienteStyles.label}>Peso inicial: </Text>
//         <Text style={expedienteStyles.label}>Peso actual: </Text>
//       </View>

//       <View style={{height: 150, width: 500, marginTop: 25}}>
//         <ScrollView style={{left: 33, top: 200, width: 500}} horizontal={true}>
//           <TouchableOpacity
//             activeOpacity={0.8}
//             style={expedienteStyles.buttonBlue}
//             onPress={() => navigator.navigate('IndicesScreen')}
//           >
//             <Text style={expedienteStyles.labelSubMenu}>Antropometría</Text>
//             <Image
//               style={expedienteStyles.image}
//               source={require('../assets/expediente/Vector.png')}
//             />
//           </TouchableOpacity>
//           <TouchableOpacity
//             activeOpacity={0.8}
//             style={expedienteStyles.buttonRed}
//             onPress={() => navigation.navigate('CitaScreen')}
//           >
//             <Text style={expedienteStyles.labelSubMenu}>Cita</Text>
//             <Image
//               style={{height: 45, width: 45, top: -15}}
//               source={require('../assets/expediente/Cita.png')}
//             />
//           </TouchableOpacity>
//           <TouchableOpacity
//             activeOpacity={0.8}
//             style={expedienteStyles.buttonOrange}
//             onPress={() => navigation.navigate('EquivalenciaScreen')}
//           >
//             <Text style={expedienteStyles.labelSubMenu}>Equivalencia</Text>
//             <Image
//               style={{height: 45, width: 45, top: -15}}
//               source={require('../assets/expediente/HojaDeEquivalencia.png')}
//             />
//           </TouchableOpacity>
//           <TouchableOpacity
//             activeOpacity={0.8}
//             style={expedienteStyles.buttonBlue}
//             onPress={() => navigation.navigate('AvanceScreen')}
//           >
//             <Text style={expedienteStyles.labelSubMenu}>AvanceVSMeta</Text>
//             <Image
//               style={{height: 45, width: 45, top: -15}}
//               source={require('../assets/expediente/Metas.png')}
//             />
//           </TouchableOpacity>
//           <TouchableOpacity
//             activeOpacity={0.8}
//             style={expedienteStyles.buttonRed}
//             onPress={() => navigation.navigate('NotasScreen')}
//           >
//             <Text style={expedienteStyles.labelSubMenu}>Notas</Text>
//             <Image
//               style={{height: 45, width: 45, top: -15}}
//               source={require('../assets/expediente/Notas.png')}
//             />
//           </TouchableOpacity>
//         </ScrollView>
//       </View>
//     </>
//   );
// };
