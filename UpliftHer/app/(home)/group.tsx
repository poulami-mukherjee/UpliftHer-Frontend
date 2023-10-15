import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";

const GroupScreen = () => {
  const navigation = useRouter();

  return (
    <View style={styles.container}>
      Group
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

export default GroupScreen;