import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackgroundGeolocation, {
  Location,
  Subscription,
} from 'react-native-background-geolocation';
import { Response } from '../types/http';
import { User } from '../types/locationTypes';

let count = 0;

const BgMode = ({ endPoint }: { endPoint: string | undefined }) => {
  const [enabled, setEnabled] = React.useState(false);
  const [location, setLocation] = React.useState<Location>();
  const [response, setResponse] = React.useState<Response>();
  const [user, setUser] = React.useState<User>();

  const enabledBg = async () => {
    await AsyncStorage.setItem('@bg_geo', JSON.stringify(true));
    BackgroundGeolocation.start();
  };

  const disabledBg = async () => {
    await AsyncStorage.removeItem('@bg_geo');
    BackgroundGeolocation.stop();
    setLocation(undefined);
    setResponse(undefined);
    count = 0;
  };

  const getLocation = React.useCallback(async () => {
    const isLocation = await AsyncStorage.getItem('@bg_geo');
    isLocation ? setEnabled(true) : setEnabled(false);
  }, []);

  const setMyLocation = React.useCallback(async () => {
    enabled ? enabledBg() : disabledBg();
  }, [enabled]);

  const getUser = async () => {
    const user = await AsyncStorage.getItem("@user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }

  React.useEffect(() => {
    /// 1.  Subscribe to events.
    const onLocation: Subscription = BackgroundGeolocation.onLocation(
      currentLocation => {
        console.debug('[onLocation]', currentLocation.coords);
        setLocation(currentLocation);
      },
    );

    const onMotionChange: Subscription = BackgroundGeolocation.onMotionChange(
      event => {
        console.debug('[onMotionChange]', event);
      },
    );

    const onActivityChange: Subscription =
      BackgroundGeolocation.onActivityChange(event => {
        console.debug('[onActivityChange]', event);
      });

    const onProviderChange: Subscription =
      BackgroundGeolocation.onProviderChange(event => {
        console.debug('[onProviderChange]', event);
      });

    const onHttp: Subscription = BackgroundGeolocation.onHttp(httpEvent => {
      console.debug(
        '[http] ',
        httpEvent.success,
        httpEvent.status,
        httpEvent.responseText,
      );
      count++;
      //setResponse(JSON.parse(httpEvent.responseText));
    });

    /// 2. ready the plugin.
    BackgroundGeolocation.ready({
      // Geolocation Config
      desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
      distanceFilter: 5,
      stopTimeout: 5,

      // Application config
      debug: false, // <-- enable this hear sounds for background-geolocation life-cycle.
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      stopOnTerminate: false, // <-- Allow the background-service to continue tracking when user closes the app.
      startOnBoot: true, // <-- Auto start tracking when device is powered-up.
      url: "http://operacion.etsg.com.co/conductores/ApiLocationDriver",
      method: "POST",
      batchSync: true, // <-- [Default: false] Set true to sync locations to server in a single HTTP request.
      autoSync: true, // <-- [Default: true] Set true to sync each location to server as it arrives.
      autoSyncThreshold: 5,
      maxBatchSize: 50,
      headers: {
        'Accept': 'application/json',
        'Authorization': `Token ${user?.key}`,
        'Content-Type': 'application/json',
      },
      params: {
        'latitude': location?.coords.latitude,
        'longitude': location?.coords.longitude,
      },
      locationsOrderDirection: 'DESC',
    }).then(async state => {
      console.debug(
        '- BackgroundGeolocation is configured and ready: ',
        state.enabled,
      );
    });

    return () => {
      onLocation.remove();
      onMotionChange.remove();
      onActivityChange.remove();
      onProviderChange.remove();
      onHttp.remove();
    };
  }, [endPoint, location]);

  /// 3. start / stop BackgroundGeolocation
  React.useEffect(() => {
    getLocation();
  }, [getLocation]);

  React.useEffect(() => {
    getUser();
  }, [getLocation]);

  React.useEffect(() => {
    setMyLocation();
  }, [setMyLocation]);

  return { enabled, setEnabled, count, location, response };
};

export { BgMode };
