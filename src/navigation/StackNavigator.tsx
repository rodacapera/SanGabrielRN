import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from 'src/templates/begin/Login';
import Splash from 'src/templates/begin/Splash';
import Home from 'src/templates/home/Home';
import PasswordFour from 'src/templates/password/PasswordFour';
import PasswordOne from 'src/templates/password/PasswordOne';
import PasswordThree from 'src/templates/password/PasswordThree';
import PasswordTwo from 'src/templates/password/PasswordTwo';
import {TermsTemplate} from 'src/templates/settings/terms';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Splash">
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="PasswordOne" component={PasswordOne} />
        <Stack.Screen name="PasswordTwo" component={PasswordTwo} />
        <Stack.Screen name="PasswordThree" component={PasswordThree} />
        <Stack.Screen name="PasswordFour" component={PasswordFour} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Terms" component={TermsTemplate} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
