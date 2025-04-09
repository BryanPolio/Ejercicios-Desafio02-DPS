import React from 'react';
import { View, FlatList, Image, Text, Platform } from 'react-native';
import { styles } from '../components/styles';

let MapView, Marker;
if (Platform.OS !== 'web') {
  MapView = require('react-native-maps').default;
  Marker = require('react-native-maps').Marker;
}

const GalleryScreen = ({ savedMedia }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={savedMedia}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.mediaItem}>
            {item.mediaType === 'photo' ? (
              <Image source={{ uri: item.uri }} style={styles.mediaThumbnail} />
            ) : (
              <Text style={styles.videoPlaceholder}>Video</Text>
            )}
            <Text style={styles.annotation}>{item.description}</Text>
          </View>
        )}
      />
      {Platform.OS !== 'web' && (
        <MapView style={styles.map}>
          {savedMedia.map((item, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: item.location.latitude,
                longitude: item.location.longitude,
              }}
              title={item.description}
            />
          ))}
        </MapView>
      )}
    </View>
  );
};

export default GalleryScreen;
