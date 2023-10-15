import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { Platform, useColorScheme } from 'react-native';
import React from 'react';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
}) {
    return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function HomeLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            initialRouteName="home"

            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    if (route.name === 'home') {
                        return (
                            <FontAwesome
                                iconName="home"
                                size={size}
                                color={color}
                            />
                        );
                    } else if (route.name === 'group') {
                        return (
                            <FontAwesome
                                iconName="group"
                                size={size}
                                color={color}
                            />
                        );
                    }
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
    );
}
