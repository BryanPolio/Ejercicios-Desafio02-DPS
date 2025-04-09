import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CaptureScreen from './src/screens/CaptureScreen';
import GalleryScreen from './src/screens/GalleryScreen';

const Stack = createStackNavigator();

const App = () => {
  const [savedMedia, setSavedMedia] = useState([]);

  const addMedia = (media) => {
    setSavedMedia((prev) => [...prev, media]);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Capture">
        <Stack.Screen name="Capture">
          {(props) => <CaptureScreen {...props} addMedia={addMedia} />}
        </Stack.Screen>
        <Stack.Screen name="Gallery">
          {(props) => <GalleryScreen {...props} savedMedia={savedMedia} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;