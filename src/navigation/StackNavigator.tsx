import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import History from '@src/templates/history/History';
import { SendReportTemplate } from '@src/templates/sendReport/SendReport';
import { ServicesDetailsTemplate } from '@src/templates/serviceDetails/ServiceDetails';
import { Services } from '@src/templates/services/Services';
import { ServiceValidationsTemplate } from '@src/templates/serviceValidations/ServiceValidations';
import { SignatureTemplate } from '@src/templates/signature/Signature';
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
import { ReportObsFinishedTemplate } from '@src/templates/reportObsFinished/ReportObsFinished';
import { NoveltyDetailsTemplate } from '@src/templates/noveltyDetails/NoveltyDetails';

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
        <Stack.Screen name="ServiceValidations" component={ServiceValidationsTemplate} />
        <Stack.Screen name="Signature" component={SignatureTemplate} />
        <Stack.Screen name="SendReport" component={SendReportTemplate} />
        <Stack.Screen name="ReportObsFinished" component={ReportObsFinishedTemplate} />
        <Stack.Screen name="NoveltyDetails" component={NoveltyDetailsTemplate} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
