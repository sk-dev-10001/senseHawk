import {StyleSheet} from 'react-native';
import colors from '../utils/colors';

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.Other.AliceBlue,
  },
  container: {
    height: '99%',
    width: '99%',
    backgroundColor: 'tomato',
  },
  map: {
    flex: 1,
    borderWidth: 1,
  },
  addressContainer: {
    position: 'absolute',
    flex: 1,
    width: '100%',
    height: '20%',
    zIndex: 1,
  },
  pointerContainer: {
    backgroundColor: colors.Other.mediumLightShadeOfcyan,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.9,
  },
  markerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerTextStyle: {
    fontSize: 30,
    alignSelf: 'center',
    color: 'black',
  },
  userNameStyle: {
    fontSize: 12,
    alignSelf: 'center',
    color: 'black',
  },
});

export default styles;
