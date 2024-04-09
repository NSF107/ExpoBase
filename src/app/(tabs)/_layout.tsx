import { FontAwesome } from "@expo/vector-icons";
import { BottomTabBar } from "@react-navigation/bottom-tabs";
import { Redirect, Tabs } from "expo-router";
import React from "react";
import { Platform, View, Text } from "react-native";
import { useAuth } from "@/context/AuthProvider";

export default function TabsLayout() {
  const { session } = useAuth();
  
  // if the user is not logged in, redirect to the login page
  if (!session) {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarStyle:
          Platform.OS === "ios"
            && {
                backgroundColor: "transparent",
              },
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
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                marginTop: 17,
                backgroundColor: "transparent",
              }}
            >
              <TabBarIcon name="home" color={color} size={24} />
              <Text style={{ marginTop: 5, fontSize: 10, opacity: 0.5 }}>
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
          headerShown: true,
          href: {
            pathname: "/account",
          },
          tabBarIcon: ({ color }) => (
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                marginTop: 17,
                backgroundColor: "transparent",
              }}
            >
              <TabBarIcon name="user" color={color} size={24} />
              <Text style={{ marginTop: 5, fontSize: 10, opacity: 0.5 }}>
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