import CustomCalendar from '@src/components/calendar/CustomCalendar';
import CustomNavBar from '@src/components/navBar/CustomNavBar';
import {sG} from '@src/globals/styles/styles';
import moment from 'moment'; // Importamos moment.js
import {useState} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Services = () => {
  const [dateSelected, setDateSelected] = useState<string>();
  const [isVisible, setIsVisible] = useState(false);

  // Usamos moment.js para obtener el primer día del año, por ejemplo '2024-01-01'
  const initialDate = moment().format('YYYY-MM-DD');

  const onClose = () => {
    setIsVisible(false);
  };

  const handleSave = (date: string) => {
    setDateSelected(date);
    setIsVisible(false);
  };

  return (
    <SafeAreaView style={[sG.container, sG.bg_white, sG.m_b_lg]}>
      <CustomNavBar title="Mis servicios" reload />
      {/* <ScrollView style={[sG.bg_light, sG.p_t_xxl]}> */}
      {/* Pasamos la fecha completa como 'YYYY-MM-DD' */}

      <View style={[sG.p_t_xxl, sG.jc_start, sG.ai_center]}>
        <TouchableOpacity onPress={() => setIsVisible(true)}>
          <View
            style={[
              sG.chrow,
              sG.border_primary,
              sG.p_x_xxl,
              sG.p_y_xs,
              sG.brounded,
              sG.jc_center,
              sG.ai_center
            ]}>
            <Icon
              name="calendar-month"
              color={sG.text_primary.color}
              size={24}
            />
            <Text style={[sG.text_primary, sG.bold, sG.m_l_xs]}>
              {dateSelected ?? initialDate}
            </Text>
          </View>
        </TouchableOpacity>

        <CustomCalendar
          isVisible={isVisible}
          onClose={onClose}
          initialDate={initialDate} // Usamos moment.js para el formato correcto
          handleSave={handleSave}
        />
      </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default Services;
