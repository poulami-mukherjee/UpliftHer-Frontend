import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot, SplashScreen, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { SessionProvider } from '../services/authContext';
import { en, registerTranslation } from 'react-native-paper-dates'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '/',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // For react native paper components
  registerTranslation('en', en);

  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const [state, setstate] = useState({
    isSignedIn: true,
  })

  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>

    // <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    //   <Stack>
    //     {state.isSignedIn == true ? (
    //       <>
    //         <Stack.Screen name="(home)"
    //           options={{
    //             title: 'Home Screen',
    //             headerShown: false
    //           }}
    //         />
    //       </>
    //     ) : (
    //       <>
    //         <Stack.Screen name="(welcome)" 
    //           options={{
    //             title: 'Welcome',
    //             headerShown: false
    //           }}/>
    //         <Stack.Screen
    //           name="register"
    //           options={{
    //             title: 'Register',
    //             headerShown: false
    //           }}
    //         />
    //         <Stack.Screen
    //           name="login"
    //           options={{
    //             title: 'Login',
    //             headerShown: false
    //           }}
    //         />
    //       </>
    //     )}
    //   </Stack>
    // </ThemeProvider>
  );
}
