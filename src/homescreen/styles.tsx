import {StyleSheet} from 'react-native';
import colors from '../utils/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subContainer: {
    backgroundColor: colors.Other.lightYellow,
    alignSelf: 'center',
    padding: 10,
    borderRadius: 30,
    width: '90%',
    height: 250,
    alignItems: 'center',
  },
  buttonContainer: {
    borderRadius: 10,
    padding: 3,
    backgroundColor: colors.Other.summerSky,
    width: '50%',
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
    marginVertical: 15,
  },
  buttonContainerText: {
    color: colors.secondary.black,
    fontWeight: '500',
  },
});
export default styles;
