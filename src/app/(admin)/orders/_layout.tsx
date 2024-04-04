import { View, Text, Pressable } from "react-native";
import React from "react";
import { Link, Stack } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

const MenuStack = () => {
  return (
    <Stack>
      {/* <Stack.Screen name="index" options={{ title: "Orders" }} /> */}
      <Stack.Screen name="list" options={{ headerShown: false }} />
    </Stack>
  );
};

export default MenuStack;
