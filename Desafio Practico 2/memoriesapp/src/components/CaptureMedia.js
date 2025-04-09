import React, { useState } from 'react';
import { View, Button, Alert } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import Geolocation from '@react-native-community/geolocation';

const CaptureMedia = ({ onCapture }) => {
  const [cameraType, setCameraType] = useState('back'); 
  const toggleCamera = () => {
    setCameraType((prev) => (prev === 'back' ? 'front' : 'back'));
  };

  const captureMedia = (mediaType) => {
    const options = {
      mediaType,
      cameraType,
      includeBase64: false,
      quality: 1,
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
        Alert.alert('User cancelled media picker');
      } else if (response.error) {
        Alert.alert('MediaPicker Error: ', response.error);
      } else if (response.assets) {
        const uri = response.assets[0].uri;
        getLocation((location) => {
          onCapture({ uri, mediaType, location });
        });
      }
    });
  };

  const getLocation = (callback) => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        callback({ latitude, longitude });
      },
      (error) => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  return (
    <View>
      <Button title="Activar camara" onPress={toggleCamera} />
      <Button title="Capture Image" onPress={() => captureMedia('photo')} />
      <Button title="Capture Video" onPress={() => captureMedia('video')} />
    </View>
  );
};

export default CaptureMedia;