import React, {memo} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {formatDate, getRandomColor} from '../utils/commonOps';
import styles from './styles';
const RenderItem = memo(({item, onSelectSaveUser}: any) => {
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => onSelectSaveUser(item)}>
      <View style={styles.leftContainer}>
        <View
          style={[
            styles.profilePhotoStyle,
            {backgroundColor: `${getRandomColor()}`},
          ]}>
          <Text style={styles.profilePhotoTextStyle}>
            {item?.name.charAt(0).toUpperCase()}
          </Text>
        </View>
        <Text style={styles.name}>{item.name}</Text>
      </View>
      <Text style={styles.location}>
        {formatDate(item.chats[item?.chats?.length - 1]?.timestamp)}
      </Text>
    </TouchableOpacity>
  );
});

export default RenderItem;
