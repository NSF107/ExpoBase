import { FontAwesome } from "@expo/vector-icons";
import { BottomTabBar } from "@react-navigation/bottom-tabs";
import { Redirect, Tabs } from "expo-router";
import React from "react";
import { Platform, StyleSheet } from "react-native";

import { Text, View } from "@/components/theme/Themed";
import { useColorScheme } from "@/components/theme/useColorScheme";
import { useAuth } from "@/context/AuthProvider";

export default function TabsLayout() {
    const { session } = useAuth();
    const colorScheme = useColorScheme();

    // if the user is not logged in, redirect to the login page
    if (!session) {
        return <Redirect href="/login" />;
    }

    return (
        <Tabs
            initialRouteName="home"
            screenOptions={{
                tabBarStyle:
                    colorScheme === "dark"
                        ? {
                              backgroundColor: "black",
                          }
                        : { backgroundColor: "white" },
                headerShown: false,
            }}
            tabBar={(props) =>
                Platform.OS === "ios" ? (
                    <BottomTabBar {...props} />
                ) : (
                    <BottomTabBar {...props} />
                )
            }
        >
            <Tabs.Screen
                name="home"
                options={{
                    href: "/home",
                    title: "",
                    tabBarIcon: ({ color }) => (
                        <View style={styles.tabView}>
                            <TabBarIcon name="home" color={color} size={24} />
                            <Text
                                style={styles.text}
                                lightColor="black"
                                darkColor="white"
                            >
                                Home
                            </Text>
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="account"
                options={{
                    title: "",
                    href: {
                        pathname: "/account",
                    },
                    tabBarIcon: ({ color }) => (
                        <View style={styles.tabView}>
                            <TabBarIcon name="user" color={color} size={24} />
                            <Text
                                style={styles.text}
                                lightColor="black"
                                darkColor="white"
                            >
                                Account
                            </Text>
                        </View>
                    ),
                }}
            />
        </Tabs>
    );
}

function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>["name"];
    color: string;
    size?: number;
}) {
    return (
        <FontAwesome
            size={props.size || 26}
            style={{ marginBottom: -3 }}
            {...props}
        />
    );
}

const styles = StyleSheet.create({
    tabView: {
        flexDirection: "column",
        alignItems: "center",
        marginTop: 17,
        backgroundColor: "transparent",
    },
    text: {
        marginTop: 5,
        fontSize: 10,
        opacity: 0.5,
    },
});
