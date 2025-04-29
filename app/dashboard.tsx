// app/dashboard.tsx
import { StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useEffect, useState } from "react";
import { getAllMoods, MoodEntry } from "../services/storage";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { EmojiMarker } from "@/components/EmojiMarker";

export default function DashboardScreen() {
  const [moods, setMoods] = useState<MoodEntry[]>([]);

  useEffect(() => {
    getAllMoods().then(setMoods);
  }, []);

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Twoje zapisane nastroje</ThemedText>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 52.2297,
          longitude: 21.0122,
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        }}
      >
        {moods.map((mood, index) => (
          <EmojiMarker
            key={index}
            latitude={mood.latitude}
            longitude={mood.longitude}
            emoji={findEmoji(mood.emotion)}
            label={mood.emotion}
          />
        ))}
      </MapView>
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
