import {eureka_logo, main_icon} from '@src/assets/images';
import CustomNavBar from '@src/components/navBar/CustomNavBar';
import {sG} from '@src/globals/styles/styles';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';

const About = () => {
  return (
    <SafeAreaView style={[sG.container, sG.bg_white, sG.m_b_lg]}>
      <CustomNavBar title="Acerca de " />
      <ScrollView style={[sG.bg_light, sG.p_t_xxl]}>
        <View style={[sG.w_100, sG.m_t_sm, sG.ai_center, sG.jc_center]}>
          <Image resizeMode="contain" style={[sG.icon_lg]} source={main_icon} />
          <Text style={[sG.text_gray_light, sG.m_t_sm]}>Version 2.3.2</Text>
        </View>
        <View style={[sG.w_100, sG.row, sG.ai_center, sG.jc_center]}>
          <View style={[sG.w_80, sG.jc_center, sG.ai_center]}>
            <Text style={[sG.text_center, sG.text_gray_light]}>
              Fecha de actualización 01 Febrero 2024
            </Text>
          </View>
        </View>
        <View style={[sG.w_100, sG.row, sG.ai_center, sG.jc_center]}>
          <View style={[sG.w_55, sG.h_55, sG.jc_center, sG.ai_center]}>
            <Text style={[sG.text_center, sG.text_gray_light]}>
              Esta información es de tipo público y podrá verificarla en la
              descripción de la aplicación en la tienda de aplicaciones.
            </Text>
          </View>
        </View>
        <View style={[sG.w_100, sG.row, sG.ai_center, sG.jc_center]}>
          <View style={[sG.w_55, sG.jc_center, sG.ai_center]}>
            <Text style={[sG.text_center, sG.text_gray_light]}>
              Todos los derechos reservados.
            </Text>
            <Text style={[sG.text_center, sG.text_black, sG.bold, sG.h7]}>
              Transportes San Gabriel.
            </Text>
          </View>
        </View>
        <View style={[sG.w_100, sG.row, sG.ai_center, sG.jc_center]}>
          <View style={[sG.w_55, sG.h_60, sG.jc_center, sG.ai_center]}>
            <Text style={[sG.text_center, sG.text_gray_light]}>
              Desarrollado por.
            </Text>
            <Image
              resizeMode="contain"
              style={[sG.icon_md]}
              source={eureka_logo}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const stylesLocal = StyleSheet.create({
  componentBottom: {
    borderBottomColor: '#f2f2f2',
    borderBottomWidth: 2
  }
});

export default About;
