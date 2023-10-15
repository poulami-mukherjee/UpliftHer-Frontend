import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import CustomButton from "../../components/formComponents/CustomButton";

const WelcomeScreen = () => {
  const navigation = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>UpliftHer</Text>
      <Text style={styles.subtitle}>Welcome</Text>
      <CustomButton onPress={(e) => navigation.push("/login")} text="LOG IN" />
      <CustomButton type="link" onPress={(e) => navigation.push("/register")} text="Don't have an account? Click here to register" />
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

export default WelcomeScreen;