import {useNavigation} from '@react-navigation/native';
import {btn_back} from '@src/assets/images';
import {sG} from '@src/globals/styles/styles';
import {StackNavigation} from '@src/types/navigation';
import {ImageBackground, StyleSheet, TouchableOpacity} from 'react-native';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomNavBar = ({title, reload}: {title: string; reload?: boolean}) => {
  const navigation = useNavigation<StackNavigation>();
  const handlePressBack = () => {
    navigation.goBack();
  };

  const handleReload = () => {
    console.log('reload');
  };

  return (
    <View
      style={[
        sG.w_100,
        // sG.jc_center,
        sG.chrow,
        sG.ai_center,
        sG.brounded_bottom,
        sG.card_shadow_bottom,
        sG.bg_white,
        sG.h_10,
        sG.position_zindex,
        sG.zIndex,
        stylesLocal.headerBottom
      ]}>
      <View style={[sG.w_20, sG.p_l_xs]}>
        <TouchableOpacity onPress={handlePressBack}>
          <ImageBackground
            resizeMode="contain"
            style={[sG.icon_xs, sG.ai_center, sG.jc_center]}
            source={btn_back}
          />
        </TouchableOpacity>
      </View>
      <View style={[sG.w_60, sG.jc_center, sG.ai_center]}>
        <Text style={[sG.h6, sG.bold, sG.text_black]}>{title}</Text>
      </View>
      <View style={[sG.w_20, sG.p_l_md]}>
        {reload && (
          <TouchableOpacity onPress={handleReload}>
            <Icon name="reload" size={37} style={[sG.text_primary]} />
          </TouchableOpacity>
        )}
      </View>
      <View style={[sG.h_100, sG.w_20, sG.jc_center, sG.ai_center]}></View>
    </View>
  );
};

const stylesLocal = StyleSheet.create({
  headerBottom: {
    top: 55
  }
});

export default CustomNavBar;
