import {StyleSheet} from 'react-native';
import colors from '../utils/colors';

const styles = StyleSheet.create({
  headerContainer: {
    height: 50,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.Other.lightShadeOfGrey,
    backgroundColor: colors.Other.blueJeans,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
  },
  leftContainer: {alignItems: 'center', flexDirection: 'row'},
  profilePhotoStyle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  flatListStyle: {marginBottom: '17%'},
  headerTextStyle: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  profilePhotoTextStyle: {
    color: 'black',
    fontSize: 18,
  },
  headerTitleStyle: {width: '90%', justifyContent: 'center'},
  backIconPressStyle: {width: '10%'},
  backIconTextStyle: {fontSize: 24},
  chatContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    position: 'absolute',
    bottom: 5,
    backgroundColor: colors.Other.blueJeans,
    // borderRadius: 10,
  },
  chatInputStyle: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 8,
    height: 45,
  },
  sendButtonContainer: {marginLeft: 10, padding: 10},
  renderItemContainer: {
    padding: 10,
    alignItems: 'flex-end',
  },
  renderItemTextContainer: {
    borderRadius: 5,
    zIndex: 999,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: 300,
    maxHeight: 200,
  },
  msgStyle: {
    padding: 5,
    color: 'black',
  },
  timeStampViewStyle: {
    justifyContent: 'flex-end',
    height: 40,
  },
  msgTime: {
    padding: 5,
    color: colors.Other.blueJeans,
    fontSize: 10,
  },
  mainContainer: {flex: 1},
  sendTextStyle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: colors.secondary.white,
    justifyContent: 'flex-end',
  },
  modalHeader: {
    backgroundColor: colors.Other.blueJeans,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  closeButton: {
    fontSize: 16,
    color: 'white',
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 14,
    color: colors.Other.blueJeans,
  },
});
export default styles;
