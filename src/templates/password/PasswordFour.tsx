import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  ImageBackground,
  SafeAreaView
} from 'react-native';
import {sG} from '../../globals/styles/styles';
import PasswordFour from './hooks/PasswordFour';
import {app_bg_01, img_success} from '@src/assets/images';

const PasswordFourTemplate = () => {
  const {handlePressLogin} = PasswordFour({});

  return (
    <SafeAreaView style={[sG.container]}>
      <View style={[sG.h_100, sG.w_100, sG.ai_center, sG.jc_center]}>
        <ImageBackground
          style={[sG.h_100, sG.w_100, sG.ai_center, sG.jc_center]}
          source={app_bg_01}>
          <View
            style={[
              sG.h_60,
              sG.w_90,
              sG.ai_center,
              sG.jc_center,
              sG.bg_white,
              sG.card_shadow,
              sG.brounded
            ]}>
            <View style={[sG.h_35, sG.w_100, sG.ai_center, sG.jc_center]}>
              <ImageBackground
                resizeMode="contain"
                style={[sG.h_60, sG.w_100, sG.ai_center, sG.jc_center]}
                source={img_success}
              />
            </View>
            <View style={[sG.h_25, sG.w_100, sG.ai_center, sG.jc_end]}>
              <Text style={[sG.h5, sG.text_center, sG.bold]}>
                Hemos Guardado tu{'\n'}nueva contraseña
              </Text>
              <Text style={[sG.h7, sG.text_center, sG.text_gray_light]}></Text>
              <Text style={[sG.h8, sG.text_center, sG.text_gray_light]}>
                Ahora puedes iniciar{'\n'}sesión con tu nueva contraseña.
              </Text>
            </View>
            <View style={[sG.h_40, sG.w_100, sG.ai_center, sG.jc_center]}>
              <TouchableOpacity
                style={[
                  sG.h_40,
                  sG.w_80,
                  sG.ai_center,
                  sG.jc_center,
                  sG.bg_primary,
                  sG.brounded
                ]}
                onPress={handlePressLogin}>
                <Text style={[sG.h7, sG.bold, sG.text_white]}>Entendido</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default PasswordFourTemplate;
