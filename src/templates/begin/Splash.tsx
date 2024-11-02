import {Image, View} from 'react-native';
import SplashHook from './hooks/SplashHook';
import {splash} from '@src/assets/images';

const Splash = () => {
  SplashHook();

  return (
    <View>
      <Image
        source={splash}
        style={{width: '100%', height: '100%', resizeMode: 'cover'}}
      />
    </View>
  );
};

export default Splash;
