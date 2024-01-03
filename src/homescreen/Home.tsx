import {View, Text, TouchableOpacity, StatusBar} from 'react-native';
import React, {memo, useEffect} from 'react';
import styles from './styles';
import GetLocation from 'react-native-get-location';
import generateCoordinatesList, {
  getDataFromStorage,
  hasLocationChanged,
  saveDataToStorage,
} from '../utils/commonOps';

const Home = memo(({navigation}: any) => {
  useEffect(() => {
    const reutnLocation = () => {
      try {
        GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 60000,
        })
          .then(async location => {
            const previousLocation = await getDataFromStorage(
              'previousLocation',
            );
            // Output: true (Distance > 100 meters)
            const locationChanged = hasLocationChanged(
              location,
              previousLocation,
            );
            console.log('lOCATION', location, locationChanged);
            if (locationChanged) {
              const latitude: any = location.latitude;
              const longitude: any = location.longitude;
              const coordinatesList1: any = generateCoordinatesList(
                latitude,
                longitude,
                10,
                1,
              );
              const coordinatesList2: any = generateCoordinatesList(
                latitude,
                longitude,
                8,
                0.8,
              );
              const coordinatesList3: any = generateCoordinatesList(
                latitude,
                longitude,
                5,
                0.4,
              );
              const mergeCoordinates = [
                ...coordinatesList1,
                ...coordinatesList2,
                ...coordinatesList3,
              ];
              if (mergeCoordinates.length) {
                await saveDataToStorage(mergeCoordinates, 'userData');
                await saveDataToStorage(location, 'previousLocation');
              }
            }
          })
          .catch(error => {
            const {code, message} = error;
            console.warn(code, message);
          });
      } catch (error) {
        console.log('error', error);
      }
    };
    reutnLocation();
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={styles.subContainer}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate('Chatscreen')}>
          <Text style={styles.buttonContainerText}>Chat screen</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate('Mapscreen')}>
          <Text style={styles.buttonContainerText}>Map screen</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});
export default Home;
