import React, {useState, useEffect, memo} from 'react';
import {View, Text, TextInput, FlatList, TouchableOpacity} from 'react-native';
import {
  formatDate,
  getDataFromStorage,
  randomId,
  saveDataToStorage,
} from '../utils/commonOps';
import styles from './styles';
import ModalComponent from './UserList';
import MapboxGL from '@rnmapbox/maps';
import {useFocusEffect} from '@react-navigation/native';

const accessToken =
  '';

MapboxGL.setWellKnownTileServer(MapboxGL.TileServers.Mapbox);
MapboxGL.setAccessToken(accessToken);
const ChatComponent = memo((props: any) => {
  const [userList, setUserList] = useState([]);
  const [userInfo, setUserInfo] = useState<any>({});
  const [chatHistory, setChatHistory] = useState([]);
  const [newMessage, setNewMessage] = useState<any>('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    if (Object.keys(userInfo)?.length) {
      setModalVisible(false);
    } else {
      // alert('Please select a user for chatting');
      props.navigation.goBack();
    }
  };

  const onSelectSaveUser = (userdata: any) => {
    if (Object.keys(userdata).length) {
      setModalVisible(false);
      setUserInfo(userdata);
      setChatHistory(userdata?.chats);
    } else {
      alert('Please select a user for chatting');
    }
  };

  useEffect(() => {
    const runEffect = async () => {
      if (props.route.params?.userInfo) {
        setChatHistory(props.route.params?.userInfo?.chats);
        setUserInfo(props.route.params?.userInfo);
        return;
      } else {
        handleOpenModal();
      }
    };
    runEffect();
  }, [props.route.params?.userInfo]);

  useFocusEffect(
    React.useCallback(() => {
      const runEffect = async () => {
        const storageData = await getDataFromStorage('userData');
        setUserList(storageData);
      };
      runEffect();

      return () => {
        console.log('Screen is unfocused!');
      };
    }, [newMessage]),
  );

  const handleSend = async () => {
    if (newMessage.trim() === '') {
      return;
    }

    const newChatMessage = {
      chatid: 'chat' + randomId(),
      msg: newMessage.trim(),
      timestamp: new Date().getTime(),
    };

    const updatedChat: any = [newChatMessage, ...chatHistory];
    setChatHistory(updatedChat);
    const {id}: any = userInfo;

    const newUerList = userList.map((item: any) => {
      if (item?.id === id) {
        return {
          ...item,
          chats: updatedChat,
        };
      }
      return item;
    });
    await saveDataToStorage(newUerList, 'userData');
    setNewMessage('');
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backIconPressStyle}
          onPress={() => props.navigation.goBack()}>
          <Text style={styles.backIconTextStyle}>◀︎</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.headerTitleStyle}
          onPress={() => handleOpenModal()}>
          <Text style={styles.headerTextStyle}>
            {userInfo?.name || 'sensehalk'}
            👨‍👩‍👧
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={chatHistory}
        inverted
        style={styles.flatListStyle}
        renderItem={({item}: any) => {
          if (!item.msg.length) {
            return null;
          }
          return (
            <View style={styles.renderItemContainer}>
              <View style={styles.renderItemTextContainer}>
                <Text style={styles.msgStyle}>{item.msg}</Text>
                <View style={styles.timeStampViewStyle}>
                  <Text style={styles.msgTime}>
                    {formatDate(item?.timestamp)}
                  </Text>
                </View>
              </View>
            </View>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />

      <View style={styles.chatContainer}>
        <TextInput
          style={styles.chatInputStyle}
          value={newMessage}
          onChangeText={text => setNewMessage(text)}
          placeholder="Type your message..."
        />
        <TouchableOpacity
          onPress={handleSend}
          style={styles.sendButtonContainer}>
          <Text style={styles.sendTextStyle}>Send</Text>
        </TouchableOpacity>
      </View>

      <ModalComponent
        visible={modalVisible}
        onClose={handleCloseModal}
        usersData={userList}
        onSelectSaveUser={onSelectSaveUser}
      />
    </View>
  );
});

export default ChatComponent;
