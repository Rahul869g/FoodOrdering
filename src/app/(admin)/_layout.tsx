import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Redirect, Tabs } from "expo-router";
import { Pressable } from "react-native";

import Colors from "@constants/Colors";
import { useColorScheme } from "@components/useColorScheme";
import { useClientOnlyValue } from "@components/useClientOnlyValue";
import { useAuth } from "@/providers/AuthProvider";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { isAdmin, profile } = useAuth();

  if (!isAdmin) {
    return <Redirect href={"/"} />;
  }
  // if (!profile || profile.group !== "ADMIN") {
  //   return <Redirect href="/" />;
  // }
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#1f2d3d",
        tabBarInactiveTintColor: "#c0ccda",
        tabBarStyle: {
          backgroundColor: "#ff49db"
        }
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
      }}
    >
      <Tabs.Screen name="index" options={{ href: null }} />
      <Tabs.Screen
        name="menu"
        options={{
          title: "Menu",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="cutlery" color={color} />
          ),
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={"#1f2d3d"}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          )
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          headerShown: false,
          title: "Order",
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />
        }}
      />
    </Tabs>
  );
}
