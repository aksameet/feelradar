export async function fetchAllMoodsFromApi() {
  const response = await fetch(
    "https://feelradar-backend-production.up.railway.app/moods"
  );
  if (!response.ok) {
    throw new Error("Błąd podczas pobierania danych");
  }
  return await response.json();
}
