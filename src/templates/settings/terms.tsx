import * as React from 'react';
import {View} from 'react-native';
import {sG} from '../../globals/styles/styles';

//components
import Terms from './hooks/terms';

export const TermsTemplate = () => {
  const {type, handlePressBack} = Terms({});
  return <View style={[sG.container]}></View>;
};
