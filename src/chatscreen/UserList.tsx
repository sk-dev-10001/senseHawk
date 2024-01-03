import React from 'react';
import {View, Text, Modal, FlatList, TouchableOpacity} from 'react-native';
import styles from './styles';
import RenderItem from './renderItem';

const ModalComponent = ({
  visible,
  onClose,
  usersData,
  onSelectSaveUser,
}: any) => {
  const renderItem = ({item}: any) => (
    <RenderItem item={item} onSelectSaveUser={onSelectSaveUser} />
  );

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.headerText}>Chat List</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeButton}>Close</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={usersData}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </Modal>
  );
};

export default ModalComponent;
