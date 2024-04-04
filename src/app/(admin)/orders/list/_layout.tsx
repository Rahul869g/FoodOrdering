import { View, Text } from "react-native";
import React from "react";
import { Tabs, withLayoutContext } from "expo-router";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SafeAreaView } from "react-native-safe-area-context";

const TopTab = withLayoutContext(createMaterialTopTabNavigator().Navigator);

const OrderListNavigator = () => {
  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-tint-dark">
      <TopTab>
        <TopTab.Screen name="index" options={{ title: "Active" }} />
      </TopTab>
    </SafeAreaView>
  );
};

export default OrderListNavigator;
