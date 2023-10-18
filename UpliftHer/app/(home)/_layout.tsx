import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Redirect, Stack, Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
import React from 'react';
import { useAuth } from '../../services/authContext';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';

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
    const { authInitialized, user } = useAuth();

    if (!authInitialized && !user) return null;
    console.log("starting ", user);
    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            {user ? (
                <Tabs
                    initialRouteName="home"
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            if (route.name === 'home') return TabBarIcon({ name: 'home', color: color })
                            else if (route.name === 'group') return TabBarIcon({ name: 'group', color: color })
                        },
                    })}
                >
                    <Tabs.Screen
                        name="home"
                    />
                    <Tabs.Screen
                        name="group"
                    />
                </Tabs>
            ) : (
                <Redirect href="/login" />
            )}
        </ThemeProvider>
    );
}

export default function HomeLayout() {
    return (
        <RootLayoutNav />
    );
}
