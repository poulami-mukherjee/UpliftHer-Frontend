import React from "react";
import { SafeAreaView, View, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";
import { validationSchema } from "../register/validation";
import { styles } from "./styles";
import CustomButton from "../../components/formComponents/CustomButton";
import CustomTextInput from "../../components/formComponents/CustomTextInput";
import CustomDatePicker from "../../components/formComponents/CustomDatePicker";


export default function RegisterForm() {
  function onSubmitHandler(values: any) {
    console.log(values);
  }

  function getStartDate() {
    const today = new Date();
    return new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
  }

  return (
    <>
      <SafeAreaView style={styles.topSafeArea} />

      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Register</Text>
        </View>

        {/* https://formik.org/docs/overview */}
        <Formik
          initialValues={{
            firstName: "",
            email: "",
            password: "",
            confirmPassword: "",
            dateOfBirth: getStartDate()
          }}
          onSubmit={(values) => {
            onSubmitHandler(values);
          }}
          validationSchema={validationSchema}
        >
          {({
            handleChange,
            values,
            setFieldValue,
            handleSubmit,
            handleBlur,
          }) => (
            // https://github.com/APSL/react-native-keyboard-aware-scroll-view
            <KeyboardAwareScrollView
              style={styles.content}
              showsVerticalScrollIndicator={false}
            >
              <CustomTextInput
                label="First Name"
                valueName="firstName"
                handleChange={handleChange("firstName")}
                handleBlur={handleBlur("firstName")}
                value={values.firstName} />

              <CustomTextInput
                label="Email Address"
                valueName="email"
                handleChange={handleChange("email")}
                handleBlur={handleBlur("email")}
                value={values.email}
                autoCapitalize="none"
              />

              <CustomDatePicker
                handleChange={(e) => { setFieldValue("dateOfBirth", e); }}
                label="Date of birth"
                value={values.dateOfBirth}
                valueName="dateOfBirth"
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

              <CustomTextInput
                label="Confirm Password"
                valueName="confirmPassword"
                handleChange={handleChange("confirmPassword")}
                handleBlur={handleBlur("confirmPassword")}
                value={values.confirmPassword}
                isSecureTextEntry={true}
                autoCapitalize="none"
              />

              <CustomButton onPress={(e) => handleSubmit()} text="SUBMIT" />
            </KeyboardAwareScrollView>
          )}
        </Formik>
      </SafeAreaView>
    </>
  );
}
