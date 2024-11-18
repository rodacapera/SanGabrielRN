import {sG} from '@src/globals/styles/styles';
import {ServicesType} from '@src/templates/services/types/servicesTypes';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomCard = ({item}: {item: ServicesType}) => {
  const status = item.estadoAssing;
  const border =
    status == 'Liberado'
      ? sG.border.borderColor
      : status == 'Aceptado'
      ? sG.border_green.borderColor
      : sG.border_orange.borderColor;
  return (
    <View
      style={[
        sG.brounded,
        sG.ai_center,
        {
          borderWidth: 1,
          borderColor: border
        }
      ]}>
      <View style={[sG.p_x_xs, sG.p_y_xs]}>
        <View style={[sG.chrow, sG.jc_between, sG.w_100, sG.m_y_xxs]}>
          <Icon color={sG.text_gray_light.color} size={24} name="information" />
          <TouchableOpacity style={[sG.chrow, sG.jc_center, sG.ai_center]}>
            <Text style={[sG.text_primary, sG.bold]}>Aceptar/Rechazar</Text>
            <Icon
              color={sG.text_primary.color}
              size={24}
              name="chevron-right-circle"
            />
          </TouchableOpacity>
        </View>
        <View style={[sG.chrow, sG.jc_between, sG.w_100, sG.m_y_xxs]}>
          <Text style={[sG.text_gray_light]}>Id Servicio:</Text>
          <Text style={[sG.text_gray_light]}>{item.id}</Text>
        </View>
        <View style={[sG.chrow, sG.jc_between, sG.w_100, sG.m_y_xxs]}>
          <Text style={[sG.text_gray_light]}>Nombre Usuario:</Text>
          <Text style={[sG.text_gray_light]}>
            {item.pasajero.primer_nombre}
          </Text>
        </View>
        <View style={[sG.chrow, sG.jc_between, sG.w_100, sG.m_y_xxs]}>
          <Text style={[sG.text_gray_light]}>Hora Recogida:</Text>
          <Text style={[sG.text_gray_light]}>
            {item.horaRecogida.toString()}
          </Text>
        </View>
        <View style={[sG.chrow, sG.jc_between, sG.w_100, sG.m_y_xxs]}>
          <Text style={[sG.text_gray_light]}>Estado Servicio:</Text>
          <Text style={[sG.text_gray_light]}>{item.estadoAssing}</Text>
        </View>
      </View>
      <View
        style={[
          sG.bg_gray_light,
          sG.jc_center,
          sG.ai_center,
          sG.w_100,
          sG.p_y_xxs
        ]}>
        <Text style={[sG.text_white, sG.bold]}>Reportar Novedad</Text>
      </View>
    </View>
  );
};

export default CustomCard;
