import React, { useState } from "react";
import { SafeAreaView, View, Text, Pressable } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";
import { validationSchema } from "../login/validation";
import { styles } from "../login/styles";
import CustomButton from "../../components/formComponents/CustomButton";
import CustomTextInput from "../../components/formComponents/CustomTextInput";
import { useAuth } from "../../services/authContext";
// import { useRouter } from "expo-router";
import HomeScreen from "./HomeScreen";

export default function LoginPage({navigation}: {navigation:any}) {
  const [pwdForgotten, setPwdForgotten] = useState(false);
  const { signIn } = useAuth();
  // const navigation = useRouter();

  async function onSubmitHandler(values: any) {
    console.log(values);
    const logging = values as UserLogging;
    const result = await signIn(logging.email, logging.password);
console.log("result", result);
    if (result.error) {
      // TODO
    } else {
      navigation.navigate(HomeScreen);
    }
  }

  return (
    <>

      <SafeAreaView style={styles.topSafeArea} />

      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Log In</Text>
        </View>

        {/* https://formik.org/docs/overview */}
        <Formik
          initialValues={{
            email: "",
            password: ""
          }}
          onSubmit={(values) => {
            onSubmitHandler(values);
          }}
          validationSchema={validationSchema}
        >
          {({
            handleChange,
            values,
            handleSubmit,
            handleBlur,
          }) => (
            // https://github.com/APSL/react-native-keyboard-aware-scroll-view
            <KeyboardAwareScrollView
              style={styles.content}
              showsVerticalScrollIndicator={false}
            >
              <CustomTextInput
                label="Email Address"
                valueName="email"
                handleChange={handleChange("email")}
                handleBlur={handleBlur("email")}
                value={values.email}
                autoCapitalize="none"
              />

              <CustomTextInput
                label="Password"
                valueName="password"
                handleChange={handleChange("password")}
                handleBlur={handleBlur("password")}
                value={values.password}
                isSecureTextEntry={true}
                autoCapitalize="none"
              />

              <CustomButton onPress={(e) => handleSubmit()} text="LOG IN" />
              {/* For future developments */}
              {/* <CustomButton type="link" onPress={() => setPwdForgotten(true)} text="Forgot password?" /> */}
            </KeyboardAwareScrollView>
          )}
        </Formik>
      </SafeAreaView>
      {/* For future developments:
      <ModalComponent onClose={() => setPwdForgotten(false)} title="Password reset" show={pwdForgotten}>
        <PasswordForgotten />
      </ModalComponent> */}

    </>
  );
}
