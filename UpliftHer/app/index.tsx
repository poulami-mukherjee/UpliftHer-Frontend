import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { contentBackground, headerBackground, mainColor } from "../constants/Colors";

const WelcomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <passage-auth app-id={process.env.REACT_APP_PASSAGE_APP_ID?.replace("\"", "").replace(";", "")}></passage-auth>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: mainColor,
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
  topSafeArea: {
    backgroundColor: headerBackground,
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
  },
});


export default WelcomeScreen;