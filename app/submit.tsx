import EmotionPicker from '@/components/EmotionPicker';
import { View, Text, StyleSheet } from 'react-native';


export default function SubmitScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jak się dziś czujesz?</Text>
      <EmotionPicker />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 24,
  },
});
