import { Stack, useRouter } from "expo-router";
import { StyleSheet,  View } from "react-native";
import CustomButton from "../components/formComponents/CustomButton";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./screens/HomeScreen";
import RegisterForm from "./screens/RegisterForm";
import LoginPage from "./screens/LoginPage";
import LandingPage from "./screens/LandingPage";
import { StatusBar } from "expo-status-bar";
const WelcomeScreen = () => {
  

  type RootStackParamList = {
    LandingPage: undefined,
    LoginPage: undefined,
    RegisterForm: undefined,
    HomeScreen: undefined
  }

  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <View style={styles.container}>
      <StatusBar style="dark"></StatusBar>
      {/* <Text style={styles.title}>UpliftHer</Text>
      <Text style={styles.subtitle}>Welcome</Text>
      <CustomButton onPress={(e) => navigation.push("/login")} text="LOG IN" />
      <CustomButton type="link" onPress={(e) => navigation.push("/register")} text="Don't have an account? Click here to register" /> */}
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="LandingPage" component={LandingPage}></Stack.Screen>
        <Stack.Screen name="HomeScreen" component={HomeScreen}></Stack.Screen>
        <Stack.Screen name="RegisterForm" component={RegisterForm}></Stack.Screen>
        <Stack.Screen name="LoginPage" component={LoginPage}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  
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