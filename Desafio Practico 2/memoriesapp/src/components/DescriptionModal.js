import React from 'react';  
import { Modal, View, TextInput, Button } from 'react-native';  
import { styles } from './styles';  

const DescriptionModal = ({ modalVisible, setModalVisible, description, setDescription }) => {  
  return (  
    <Modal  
      animationType="slide"  
      transparent={true}  
      visible={modalVisible}  
      onRequestClose={() => setModalVisible(false)}  
    >  
      <View style={styles.modalView}>  
        <TextInput  
          style={styles.modalInput}  
          placeholder="Edit description..."  
          value={description}  
          onChangeText={setDescription}  
        />  
        <Button title="Close" onPress={() => setModalVisible(false)} />  
      </View>  
    </Modal>  
  );  
};  

export default DescriptionModal;  