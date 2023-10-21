import { StyleSheet, ViewStyle, Platform } from "react-native";
import Constants from "expo-constants";
import { contentBackground, headerBackground} from "../../constants/Colors";

export const styles = StyleSheet.create({
  topSafeArea: {
    backgroundColor: headerBackground,
  },
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor:
      Platform.OS === "ios" ? contentBackground : headerBackground,
  },
  header: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: headerBackground,
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
  },
  content: {
    padding: 20,
    backgroundColor: contentBackground,
  }
});
