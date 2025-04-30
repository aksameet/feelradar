import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Alert,
  ActivityIndicator,
} from "react-native";
import MapView, { Marker, MapPressEvent, Region } from "react-native-maps";
import * as Location from "expo-location";
import EmotionPicker from "../components/EmotionPicker";
import { saveMood } from "../services/storage";
import { ThemedText } from "@/components/ThemedText";
import { API_BASE_URL } from "@/constants/api";
import Toast from "react-native-root-toast";

export default function SubmitScreen() {
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [initialRegion, setInitialRegion] = useState<Region | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Brak dostępu do lokalizacji");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setInitialRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    })();
  }, []);

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

      saveMood(newEntry);

      fetch(`${API_BASE_URL}/moods`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEntry),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Błąd wysyłki");
          return res.json();
        })
        .then(() => {
          Alert.alert("Zapisano!", "Nastrój został wysłany na serwer.");
          setSelectedEmotion(null);
          setSelectedLocation(null);
        })
        .catch((err) => {
          Alert.alert("Błąd", "Nie udało się wysłać nastroju.");
          console.error(err);
        });
    }
  };

  const handleEmotionSelect = (emotion: string) => {
    setSelectedEmotion(emotion);
  };

  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>
        Wybierz nastrój, a następnie kliknij na mapie
      </ThemedText>

      {initialRegion ? (
        <MapView
          style={styles.map}
          onPress={handleMapPress}
          initialRegion={initialRegion}
        >
          {selectedLocation && (
            <Marker coordinate={selectedLocation} title="Wybrana lokalizacja" />
          )}
        </MapView>
      ) : (
        <ActivityIndicator size="large" style={{ marginTop: 32 }} />
      )}

      <EmotionPicker onSelect={handleEmotionSelect} />

      {selectedEmotion && (
        <ThemedText style={styles.confirmText}>
          Kliknij na mapie, aby przypisać: {selectedEmotion}
        </ThemedText>
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
    fontWeight: "600",
    textAlign: "center",
    marginTop: 16,
    marginBottom: 8,
  },
  map: {
    width: Dimensions.get("window").width,
    height: 250,
  },
  confirmText: {
    textAlign: "center",
    marginTop: 12,
    fontSize: 16,
  },
});
