import React, {memo, useEffect, useMemo, useState} from 'react';
import {View, Text, TouchableOpacity, Platform} from 'react-native';
import styles from './styles';

const accessToken =
  '';
import MapboxGL from '@rnmapbox/maps';
import Mapbox from '@rnmapbox/maps';
import generateCoordinatesList, {getDataFromStorage} from '../utils/commonOps';
import {useFocusEffect} from '@react-navigation/native';
MapboxGL.setWellKnownTileServer(MapboxGL.TileServers.Mapbox);
MapboxGL.setAccessToken(accessToken);
Mapbox.setWellKnownTileServer(Mapbox.TileServers.Mapbox);
Mapbox.setAccessToken(accessToken);
const MapScreen = memo((props: any) => {
  const [userData, setUserData] = useState([]);
  const [userLocation, setUserLocation] = useState<any>([73.20812, 22.29941]);

  useEffect(() => {
    MapboxGL.setTelemetryEnabled(false);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const runEffect = async () => {
        const storageData = await getDataFromStorage('userData');
        setUserData(storageData);
      };
      runEffect();

      return () => {
        console.log('Screen is unfocused!');
      };
    }, []),
  );

  const circlePoints = useMemo(() => {
    const randomNumbersArray = generateCoordinatesList(
      userLocation[1],
      userLocation[0],
      100,
    );
    return randomNumbersArray;
  }, [userLocation]);

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapboxGL.MapView
          style={styles.map}
          logoEnabled={false}
          localizeLabels={true}>
          <MapboxGL.UserLocation
            animated
            showsUserHeadingIndicator
            minDisplacement={1}
            onUpdate={position => {
              setUserLocation([
                position.coords.longitude,
                position.coords.latitude,
              ]);
            }}
          />
          <MapboxGL.Camera
            zoomLevel={14}
            animationMode={'flyTo'}
            animationDuration={1100}
            centerCoordinate={userLocation}
          />

          <MapboxGL.PointAnnotation id={'location'} coordinate={userLocation}>
            <View style={[styles.pointerContainer]} />
          </MapboxGL.PointAnnotation>

          {userData?.map((marker: any) => {
            const longitude: any = marker?.longitude;
            const latitude: any = marker?.latitude;
            const id: any = marker?.id;
            return (
              <MapboxGL.MarkerView
                key={id}
                id={id}
                coordinate={[longitude, latitude]}>
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate('Chatscreen', {
                      userInfo: marker,
                    });
                  }}
                  style={styles.markerStyle}>
                  <Text style={styles.markerTextStyle}>🧑🏻‍🦰</Text>
                  <Text style={styles.userNameStyle}>{marker?.name}</Text>
                </TouchableOpacity>
              </MapboxGL.MarkerView>
            );
          })}

          {Platform.OS === 'android' &&
            circlePoints.map((marker: any) => {
              const longitude: any = marker.longitude;
              const latitude: any = marker.latitude;
              const id: any = marker.id;
              return (
                <MapboxGL.MarkerView
                  key={id}
                  id={id}
                  coordinate={[longitude, latitude]}>
                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.navigate('Chatscreen', {
                        userInfo: marker,
                      });
                    }}
                    style={styles.markerStyle}>
                    <Text style={styles.markerTextStyle}>.</Text>
                  </TouchableOpacity>
                </MapboxGL.MarkerView>
              );
            })}
        </MapboxGL.MapView>
      </View>
    </View>
  );
});
export default MapScreen;
