import { StyleSheet } from 'react-native';
import * as Yup from "yup";

import { Formik } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomTextInput from '../components/formComponents/CustomTextInput';
import CustomButton from '../components/formComponents/CustomButton';
import { contentBackground } from '../constants/Colors';

export default function PasswordForgotten() {
  function onSubmitHandler(values: any) {
    console.log(values);
  }

  return (
        <Formik
          initialValues={{
            email: "",
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

              <CustomButton onPress={(e) => handleSubmit()} text="RESET PASSWORD" />
            </KeyboardAwareScrollView>
          )}
        </Formik>
  );
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Please enter an email address")
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  content: {
    padding: 20,
    backgroundColor: contentBackground,
  }
});
