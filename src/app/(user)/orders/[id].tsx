import { View, Text, FlatList } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import orders from "@assets/data/orders";
import OrderListItem from "@/components/OrderListItem";
import OrderItemListItem from "@/components/OrderItemListItem";

const OrderDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const order = orders.find((item) => item.id.toString() === id);
  if (!order) {
    return <Text>Order not Found!</Text>;
  }
  return (
    <View className="p-3 rounded-lg">
      <Stack.Screen options={{ title: `Order #${order?.id}` }} />
      <OrderListItem order={order} />
      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ gap: 10, marginTop: 10 }}
      />
    </View>
  );
};

export default OrderDetailsScreen;
