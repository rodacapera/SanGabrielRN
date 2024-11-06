import * as React from 'react';
import {View, Text} from 'react-native';
import {sG} from '../../globals/styles/styles';

//components
import Terms from './hooks/terms';

export const TermsTemplate = () => {
  const {type, handlePressBack} = Terms({});
  return (
    <View style={[sG.container]}>
      <Text style={[sG.h8, sG.text_black, sG.bold]}>Confirmar Contraseña</Text>
    </View>
  );
};
