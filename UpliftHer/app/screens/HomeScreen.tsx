// import { useRouter } from "expo-router";
import { StyleSheet, View, Text } from "react-native";

const HomeScreen = () => {
  //const navigation = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>How was your day today?</Text>
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
    color: '#147DB2'
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
  }
});

export default HomeScreen;