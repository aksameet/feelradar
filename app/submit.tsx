import { View, Text, StyleSheet, Dimensions, Alert } from 'react-native';
import MapView, { Marker, MapPressEvent } from 'react-native-maps';
import { useState } from 'react';
import EmotionPicker from '../components/EmotionPicker';
import { saveMood } from '../services/storage';
import { ThemedText } from '@/components/ThemedText';

export default function SubmitScreen() {
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  const handleMapPress = (event: MapPressEvent) => {
    const coords = event.nativeEvent.coordinate;
    setSelectedLocation(coords);

    if (selectedEmotion) {
      const newEntry = {
        emotion: selectedEmotion,
        latitude: coords.latitude,
        longitude: coords.longitude,
        timestamp: new Date().toISOString(),
      };
      saveMood(newEntry)
        .then(() => {
          Alert.alert('Zapisano!', 'Nastrój został zapisany lokalnie.');
          setSelectedEmotion(null);
          setSelectedLocation(null);
        })
        .catch((err) => {
          Alert.alert('Błąd', 'Nie udało się zapisać nastroju.');
          console.error(err);
        });
    }
  };

  const handleEmotionSelect = (emotion: string) => {
    setSelectedEmotion(emotion);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wybierz nastrój a nastepnie lokalizację</Text>

      <MapView
        style={styles.map}
        onPress={handleMapPress}
        initialRegion={{
          latitude: 52.2297,
          longitude: 21.0122,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}>
        {selectedLocation && <Marker coordinate={selectedLocation} title="Wybrana lokalizacja" />}
      </MapView>

      <EmotionPicker onSelect={handleEmotionSelect} />

      {selectedEmotion && (
        <ThemedText style={styles.confirmText}>Kliknij na mapie, aby przypisać: {selectedEmotion}</ThemedText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 8,
    color: '#FFF',
  },
  map: {
    width: Dimensions.get('window').width,
    height: 250,
  },
  confirmText: {
    textAlign: 'center',
    marginTop: 12,
    fontSize: 16,
  },
});
