// components/EmojiMarker.tsx
import { View, Text, StyleSheet } from 'react-native';
import { Marker } from 'react-native-maps';

type EmojiMarkerProps = {
  latitude: number;
  longitude: number;
  emoji: string;
  label?: string;
};

export function EmojiMarker({ latitude, longitude, emoji, label }: EmojiMarkerProps) {
  return (
    <Marker coordinate={{ latitude, longitude }} title={label}>
      <View style={styles.emojiContainer}>
        <Text style={styles.emoji}>{emoji}</Text>
      </View>
    </Marker>
  );
}

const styles = StyleSheet.create({
  emojiContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 24,
  },
});
