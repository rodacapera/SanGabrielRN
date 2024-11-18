import CustomCalendar from '@src/components/calendar/CustomCalendar';
import CustomCard from '@src/components/card/CustomCard';
import CustomNavBar from '@src/components/navBar/CustomNavBar';
import {sG} from '@src/globals/styles/styles';
import moment from 'moment'; // Importamos moment.js
import {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ServicesType} from './types/servicesTypes';

const Services = () => {
  const [dateSelected, setDateSelected] = useState<string>();

  console.log('dateSelected', dateSelected);

  const item = {
    pasajero: {
      primer_nombre: 'rhonald',
      primer_apellido: 'capera'
    },
    horaRecogida: '2024-11-13',
    estadoAssing: 'Liberado',
    id: 1234
  } as ServicesType;

  return (
    <SafeAreaView style={[sG.container, sG.bg_white, sG.m_b_lg]}>
      <CustomNavBar title="Mis servicios" reload />

      <View style={[sG.p_t_xxl, sG.jc_start, sG.ai_center]}>
        <CustomCalendar setDateSelected={setDateSelected} />
      </View>
      <ScrollView style={[sG.p_t_lg, sG.p_x_sm]}>
        <CustomCard item={item} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Services;
