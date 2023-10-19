import { View, Text } from "../../components/Themed";
import CustomButton from "../../components/formComponents/CustomButton";
import { StyleSheet } from 'react-native';
// import { useRouter } from "expo-router";
import LoginPage from "./LoginPage";
import RegisterForm from "./RegisterForm";
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  LandingPage: undefined,
  LoginPage: undefined,
  RegisterForm: undefined,
  HomeScreen: undefined
}

type LoginNavigationProp = NativeStackScreenProps<RootStackParamList, 'LandingPage'>

type Props = {
  navigation: LoginNavigationProp
}

export default function LandingPage({ navigation}: Props){
   
    return(
        <View style={styles.parentContainer}>
         <Text style={styles.title}>UpliftHer</Text>
      <Text style={styles.subtitle}>Welcome</Text>
      <CustomButton onPress={(e) => navigation.navigation.navigate('LoginPage')} text="LOG IN" />
      <CustomButton type="link" onPress={(e) => navigation.navigation.navigate('RegisterForm')} text="Don't have an account? Click here to register" /> 
        </View>
    )
}

const styles = StyleSheet.create({

    parentContainer: {
        alignItems: 'center',
        alignSelf: 'stretch',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center'
    },
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
      textAlign: 'center'
    },
    subtitle: {
      fontSize: 16,
      textAlign: "center",
    },
  });
  