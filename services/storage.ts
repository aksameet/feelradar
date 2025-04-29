// services/storage.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

export type MoodEntry = {
  emotion: string;
  latitude: number;
  longitude: number;
  timestamp: string;
};

const STORAGE_KEY = "mood_entries";

export async function saveMood(entry: MoodEntry) {
  const existing = await AsyncStorage.getItem(STORAGE_KEY);
  const data = existing ? JSON.parse(existing) : [];
  data.push(entry);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export async function getAllMoods(): Promise<MoodEntry[]> {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export async function clearMoods() {
  await AsyncStorage.removeItem(STORAGE_KEY);
}
