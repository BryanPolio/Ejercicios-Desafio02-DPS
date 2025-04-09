import React, { useState } from 'react';
import { View, Button, ScrollView, Alert } from 'react-native';
import CaptureMedia from '../components/CaptureMedia';
import DisplayCapture from '../components/DisplayCapture';
import DescriptionModal from '../components/DescriptionModal';
import { styles } from '../components/styles';

const CaptureScreen = ({ navigation, addMedia }) => {
  const [mediaUri, setMediaUri] = useState(null);
  const [mediaType, setMediaType] = useState(null);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleMediaCapture = ({ uri, mediaType, location }) => {
    setMediaUri(uri);
    setMediaType(mediaType);
    setLocation(location);
  };

  const handleSaveCapture = () => {
    const newMedia = { uri: mediaUri, mediaType, description, location };
    addMedia(newMedia);
    Alert.alert('Capture Saved!', `Location: ${location ? JSON.stringify(location) : 'N/A'}`);
    setMediaUri(null);
    setDescription('');
    setLocation(null);
  };

  return (
    <View style={styles.container}>
      <CaptureMedia onCapture={handleMediaCapture} />
      <ScrollView style={styles.resultContainer}>
        {mediaUri && (
          <DisplayCapture
            mediaUri={mediaUri}
            mediaType={mediaType}
            description={description}
            setDescription={setDescription}
            setModalVisible={setModalVisible}
            location={location}
            onSave={handleSaveCapture}
          />
        )}
      </ScrollView>
      <DescriptionModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        description={description}
        setDescription={setDescription}
      />
      <Button title="View Gallery" onPress={() => navigation.navigate('Gallery')} />
    </View>
  );
};

export default CaptureScreen;
