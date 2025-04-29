import { View, Pressable, Text, StyleSheet } from 'react-native';

const emotions = [
  { label: 'Szczęśliwy', icon: '😀' },
  { label: 'Smutny', icon: '😢' },
  { label: 'Zły', icon: '😠' },
  { label: 'Zestresowany', icon: '😰' },
  { label: 'Zrelaksowany', icon: '😌' },
  { label: 'Zaskoczony', icon: '😮' },
];

export default function EmotionPicker() {
  const handleSelect = (emotion: string) => {
    console.log(`Selected emotion: ${emotion}`);
  };

  return (
    <View style={styles.wrapper}>
      {emotions.map((e) => (
        <Pressable key={e.label} style={styles.emoji} onPress={() => handleSelect(e.label)}>
          <Text style={{ fontSize: 32 }}>{e.icon}</Text>
          <Text style={styles.label}>{e.label}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
  emoji: {
    alignItems: 'center',
    padding: 12,
  },
  label: {
    marginTop: 4,
    fontSize: 12,
    color: '#555',
  },
});
