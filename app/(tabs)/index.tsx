import { Image, StyleSheet, Pressable, Text } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Link } from "expo-router";

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Cze</ThemedText>
        <HelloWave />
      </ThemedView>
      <Link href="/submit" asChild>
        <Pressable
          style={{ backgroundColor: "#1e88e5", padding: 12, borderRadius: 8 }}
        >
          <ThemedText style={{ color: "white" }}>Zgłoś nastrój</ThemedText>
        </Pressable>
      </Link>
      <Link href="/dashboard" asChild>
        <Pressable
          style={{
            backgroundColor: "#4caf50",
            padding: 12,
            borderRadius: 8,
            marginTop: 12,
          }}
        >
          <ThemedText>Zobacz mapę nastrojów</ThemedText>
        </Pressable>
      </Link>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 100,
    width: 200,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
