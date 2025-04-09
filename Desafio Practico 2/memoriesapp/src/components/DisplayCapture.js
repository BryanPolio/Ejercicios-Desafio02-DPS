import React from 'react';
import { View, Image, TextInput, Button, Text } from 'react-native';
import Video from 'react-native-video'; 
import { styles } from './styles';

const DisplayCapture = ({ mediaUri, mediaType, description, setDescription, setModalVisible, location, onSave }) => {
  return (
    <View style={styles.captureView}>
      {mediaType === 'photo' ? (
        <Image source={{ uri: mediaUri }} style={styles.image} />
      ) : (
        <Video source={{ uri: mediaUri }} style={styles.image} controls />
      )}
      <Text style={styles.annotation}>{description}</Text>
      <TextInput
        style={styles.input}
        placeholder="Add a description..."
        value={description}
        onChangeText={setDescription}
      />
      <Text>
        Location: {location ? `Lat: ${location.latitude}, Lon: ${location.longitude}` : 'Fetching...'}
      </Text>
      <Button title="Save Capture" onPress={onSave} />
      <Button title="Edit Description" onPress={() => setModalVisible(true)} />
    </View>
  );
};

export default DisplayCapture;