import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Redirect, Tabs, useRouter } from 'expo-router';
import { useColorScheme } from 'react-native';
import React from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useCurrentUser } from '../../services/useCurrentUser';
import CustomButton from '../../components/formComponents/CustomButton';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
}) {
    return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

function RootLayoutNav() {
    const colorScheme = useColorScheme();
    // our hook to retrieve the connected user's data
    const { isLoading, isAuthorized, username } = useCurrentUser();
    const navigation = useRouter();

    if (isLoading) {
        return null;
    }

    const unauthorizedBody =
        <>
            Please login to continue
            <br /><br />
            <CustomButton text='Go to login' type='primary' onPress={() => navigation.push("/")} />
        </>;

    const authorizedBody =
        <Tabs
            initialRouteName="home"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    if (route.name === 'home') return TabBarIcon({ name: 'home', color: color })
                    else if (route.name === 'group') return TabBarIcon({ name: 'group', color: color })
                    else if (route.name === 'profile') return TabBarIcon({ name: 'user', color: color })
                },
                tabBarShowLabel: false,
            })}
        >
            <Tabs.Screen name="home" />
            <Tabs.Screen name="group" />
            <Tabs.Screen name="profile" />
        </Tabs>;

    console.log("starting ", username);
    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            {isAuthorized ? authorizedBody : unauthorizedBody}
        </ThemeProvider>
    );
}

export default function HomeLayout() {
    return (
        <RootLayoutNav />
    );
}
