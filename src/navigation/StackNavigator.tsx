import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import History from '@src/templates/history/History';
import { Scanpdf417Template } from '@src/templates/services/Scanpdf417';
import { ServicesDetailsTemplate } from '@src/templates/services/ServiceDetails';
import { Services } from '@src/templates/services/Services';
import About from '@src/templates/settings/About';
import {Policy} from '@src/templates/settings/policy';
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
        <Stack.Screen name="Policy" component={Policy} />
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="Services" component={Services} />
        <Stack.Screen name="History" component={History} />
        <Stack.Screen name="ServicesDetails" component={ServicesDetailsTemplate} />
        <Stack.Screen name="Scanpdf417" component={Scanpdf417Template} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
