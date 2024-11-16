import CustomNavBar from '@src/components/navBar/CustomNavBar';
import {sG} from '@src/globals/styles/styles';
import {SafeAreaView, ScrollView} from 'react-native';

const History = () => {
  return (
    <SafeAreaView style={[sG.container, sG.bg_white, sG.m_b_lg]}>
      <CustomNavBar title="Historial" reload />
      <ScrollView style={[sG.bg_light, sG.p_t_xxl]}></ScrollView>
    </SafeAreaView>
  );
};

export default History;
