/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler'; // Import this at the top of the file
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  LogBox,
  Platform,
  StyleSheet,
} from 'react-native';

import AppStackNavigator from './src/rootnavigator/RootNavigator';
import Mapbox from '@rnmapbox/maps';
import colors from './src/utils/colors';

export const IS_ANDROID = Platform.OS === 'android';
export const IS_IOS = Platform.OS === 'ios';
export const DEFAULT_CENTER_COORDINATE = [-77.036086, 38.910233];
export const SF_OFFICE_COORDINATE = [-122.400021, 37.789085];

LogBox.ignoreLogs([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
]);

const styles = StyleSheet.create({
  noPermissionsText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

const AppContainer = () => <AppStackNavigator />;
const App = () => {
  const [isFetchingAndroidPermission, setIsFetchingAndroidPermission] =
    useState(IS_ANDROID);
  const [isAndroidPermissionGranted, setIsAndroidPermissionGranted] =
    useState(false);

  useEffect(() => {
    const getPermission = async () => {
      if (IS_ANDROID) {
        const isGranted = await Mapbox.requestAndroidLocationPermissions();
        setIsAndroidPermissionGranted(isGranted);
        setIsFetchingAndroidPermission(false);
      }
    };
    getPermission();
  }, []);

  if (IS_ANDROID && !isAndroidPermissionGranted) {
    if (isFetchingAndroidPermission) {
      return null;
    }
    return (
      <SafeAreaView style={[{backgroundColor: colors.primary.blue}]}>
        <View>
          <Text style={styles.noPermissionsText}>
            You need to accept location permissions in order to use this example
            applications
          </Text>
        </View>
      </SafeAreaView>
    );
  }
  return <AppContainer />;
};

export default App;
