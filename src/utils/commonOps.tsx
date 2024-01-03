import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from './colors';
import {Location} from '@rnmapbox/maps';

function calculateDistance(lat1: any, lon1: any, lat2: any, lon2: any) {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
}

function generateCoordinatesList(
  currentLat: any,
  currentLon: any,
  numberOfCoordinates = 10,
  radiusInKm: any = 1,
) {
  const validCoordinates = [];

  for (let i = 0; i < numberOfCoordinates; i++) {
    const angle = (360 / numberOfCoordinates) * i;
    const distance = radiusInKm / 6371; // Convert radius from km to radians

    const lat2 = Math.asin(
      Math.sin((currentLat * Math.PI) / 180) * Math.cos(distance) +
        Math.cos((currentLat * Math.PI) / 180) *
          Math.sin(distance) *
          Math.cos((angle * Math.PI) / 180),
    );

    const lon2 =
      ((currentLon * Math.PI) / 180 +
        Math.atan2(
          Math.sin((angle * Math.PI) / 180) *
            Math.sin(distance) *
            Math.cos((currentLat * Math.PI) / 180),
          Math.cos(distance) -
            Math.sin((currentLat * Math.PI) / 180) * Math.sin(lat2),
        )) *
      (180 / Math.PI);

    const generatedLat = (lat2 * 180) / Math.PI;
    const generatedLon = ((lon2 + 540) % 360) - 180;

    if (
      generatedLat >= -90 &&
      generatedLat <= 90 &&
      calculateDistance(currentLat, currentLon, generatedLat, generatedLon) <=
        radiusInKm
    ) {
      validCoordinates.push({
        latitude: generatedLat,
        longitude: generatedLon,
        id: randomId(),
        name: randomId(),

        chats: [
          {
            msg: '',
            timestamp: new Date().getTime(),
            chatid: 'chat' + randomId(),
          },
          {
            msg: '',
            timestamp: new Date().getTime(),
            chatid: 'chat' + randomId(),
          },
        ],
      });
    }
  }

  return validCoordinates;
}

export const randomId = function (length = 6) {
  return Math.random()
    .toString(36)
    .substring(2, length + 2);
};

export async function saveDataToStorage(data: any, key: any) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.log('Error saving data:', error);
  }
}

export async function getDataFromStorage(key: any) {
  try {
    const data = await AsyncStorage.getItem(key);
    if (data !== null) {
      return JSON.parse(data);
    }
    return null;
  } catch (error) {
    console.log('Error getting data:', error);
    return null;
  }
}

export function formatDate(timestamp: any) {
  const date = new Date(timestamp);

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const day = date.getDate();
  const month = date.toLocaleString('default', {month: 'short'});

  const formattedDate = `${hours}:${
    minutes < 10 ? '0' : ''
  }${minutes} ${day} ${month}`;

  return formattedDate;
}

export function getRandomColor() {
  const colorslist: any = {...colors.secondary, ...colors.primary};
  const colorKeys = Object.keys(colorslist);
  const randomKey = colorKeys[Math.floor(Math.random() * colorKeys.length)];
  const randomColor = colorslist[randomKey];

  return randomColor;
}

function getDistanceFromLatLonInMeters(
  lat1: any,
  lon1: any,
  lat2: any,
  lon2: any,
) {
  const earthRadius = 6371000; // Earth's radius in meters
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c;
  return distance;
}

function deg2rad(deg: any) {
  return deg * (Math.PI / 180);
}

export function hasLocationChanged(
  currentLocation: any,
  previousLocation: any,
) {
  if (!previousLocation) {
    return true;
  }

  const distanceInMeters = getDistanceFromLatLonInMeters(
    currentLocation.latitude,
    currentLocation.longitude,
    previousLocation.latitude,
    previousLocation.longitude,
  );
  return distanceInMeters > 10;
}

export default generateCoordinatesList;
