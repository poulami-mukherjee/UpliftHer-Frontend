import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { MoodTrackingApi } from "../../services/mood-tracking-service";
import MoodTracker from "../../components/MoodTracker";
import CustomSnackbar, { Snack } from "../../components/CustomSnackbar";
import { SnackbarContext } from "../../services/contexts/snackbarContext";

const HomeScreen = () => {
  const [showMoodTracker, setShowMoodTracker] = useState(false);
  const [snack, setSnack] = useState(new Snack({ open: false }));

  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      const isMoodTracked = await MoodTrackingApi.getTodayMoodTrackingStateAsync();
      setShowMoodTracker(!isMoodTracked);
    }

    // call the function
    fetchData()
      .catch(console.error);
  }, [])

  return (
    <View style={styles.container}>
      <SnackbarContext.Provider value={{ snack, setSnack }}>
        {showMoodTracker && <MoodTracker onClose={() => setShowMoodTracker(true)} />}
        <CustomSnackbar visible={snack.open} color={snack.color} text={snack.message} onDismiss={function (): void {
          setSnack(new Snack({ open: false }))
        }} />
      </SnackbarContext.Provider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default HomeScreen;