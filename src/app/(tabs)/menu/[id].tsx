import { View, Text } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";

const ProductScreen = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Stack.Screen options={{ title: "Details: " + id }} />
      <Text className="text-2xl">ProductScreen: {id}</Text>
    </View>
  );
};

export default ProductScreen;
