import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { MoodTrackingApi } from "../../services/mood-tracking-service";
import { Modal } from "react-native-paper";
import MoodTracker from "../../components/MoodTracker";
import CustomSnackbar, { Snack } from "../../components/CustomSnackbar";
import { createContext } from 'react';

type SnackDefaultValue = {
  snack: Snack,
  setSnack: React.Dispatch<React.SetStateAction<Snack>>
};

export const SnackbarContext = createContext<SnackDefaultValue>({snack: new Snack({open: false}), setSnack: () => {}});

const HomeScreen = () => {
  const [showMoodTracker, setShowMoodTracker] = useState(false);
  const [snack, setSnack] = useState(new Snack({open: false}));

  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      const isMoodTracked = await MoodTrackingApi.getTodayMoodTrackingStateAsync();
      setShowMoodTracker(!isMoodTracked);
    }

    // call the function
    fetchData()
      .catch(console.error);;
  }, [])

  return (
    <View style={styles.container}>
      {showMoodTracker && <Modal style={styles.modalContent} visible><MoodTracker onClose={() => setShowMoodTracker(true)} /></Modal>}
      <SnackbarContext.Provider value={{ snack, setSnack }}>
        <CustomSnackbar visible={snack.open} text={snack.message} onDismiss={function (): void {
          setSnack(new Snack({open: false}))
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
  modalContent: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0
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