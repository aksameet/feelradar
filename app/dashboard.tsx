import { useEffect, useState } from "react";
import { Alert, Dimensions, StyleSheet, ActivityIndicator } from "react-native";
import MapView from "react-native-maps";
import { Marker, Region } from "react-native-maps";
import * as Location from "expo-location";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { EmojiMarker } from "@/components/EmojiMarker";

type MoodEntry = {
  id: number;
  emotion: string;
  latitude: number;
  longitude: number;
  timestamp: string;
};

export default function DashboardScreen() {
  const [moods, setMoods] = useState<MoodEntry[]>([]);
  const [initialRegion, setInitialRegion] = useState<Region | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // lokalizacja
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Brak dostępu do lokalizacji");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const region = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2,
      };
      setInitialRegion(region);
    })();
  }, []);

  useEffect(() => {
    // dane z backendu
    fetch("https://feelradar-backend-production.up.railway.app/moods")
      .then((res) => {
        if (!res.ok) throw new Error("Błąd API");
        return res.json();
      })
      .then(setMoods)
      .catch((err) => {
        console.error(err);
        Alert.alert("Błąd", "Nie udało się pobrać nastrojów z serwera.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Zgłoszone nastroje</ThemedText>

      {initialRegion && !loading ? (
        <MapView style={styles.map} initialRegion={initialRegion}>
          {/* Można dodać marker "Tu jesteś" */}
          <Marker
            coordinate={{
              latitude: initialRegion.latitude,
              longitude: initialRegion.longitude,
            }}
            title="Tu jesteś"
          />

          {moods.map((mood) => (
            <EmojiMarker
              key={mood.id}
              latitude={mood.latitude}
              longitude={mood.longitude}
              emoji={findEmoji(mood.emotion)}
              label={mood.emotion}
            />
          ))}
        </MapView>
      ) : (
        <ActivityIndicator size="large" style={{ marginTop: 32 }} />
      )}
    </ThemedView>
  );
}

function findEmoji(emotion: string): string {
  switch (emotion) {
    case "Szczęśliwy":
      return "😀";
    case "Smutny":
      return "😢";
    case "Zły":
      return "😠";
    case "Zestresowany":
      return "😰";
    case "Zrelaksowany":
      return "😌";
    case "Zaskoczony":
      return "😮";
    default:
      return "❓";
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginVertical: 16,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 120,
  },
});
