import {
  View,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator
} from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import orders from "@assets/data/orders";
import OrderListItem from "@/components/OrderListItem";
import OrderItemListItem from "@/components/OrderItemListItem";
import { OrderStatusList } from "@/types";
import { useOrderDetails, useUpdateOrder } from "@/api/orders";

const OrderDetailsScreen = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);
  const { data: order, isLoading, error } = useOrderDetails(id);
  const { mutate: updateOrder } = useUpdateOrder();

  const updateStatus = (status) => {
    updateOrder({ id: id, updatedField: { status } });
    console.log("******", order);
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error || !order) {
    return <Text>Failed to fetch Products</Text>;

    console.log(order);
  }
  return (
    <View className="p-3 rounded-lg">
      <Stack.Screen options={{ title: `Order #${order?.id}` }} />
      <OrderListItem order={order} />
      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ gap: 10, marginTop: 10 }}
        ListFooterComponent={() => (
          <>
            <Text style={{ fontWeight: "bold" }}>Status</Text>
            <View style={{ flexDirection: "row", gap: 5 }}>
              {OrderStatusList.map((status) => (
                <Pressable
                  key={status}
                  onPress={() => updateStatus(status)}
                  className={`border border-tint-light border-1 p-2 rounded-md my-[10] ${
                    order.status === status ? "bg-tint-light" : "transparent"
                  }`}
                >
                  <Text
                    style={{
                      color: order.status === status ? "white" : "bg-tint-light"
                    }}
                  >
                    {status}
                  </Text>
                </Pressable>
              ))}
            </View>
          </>
        )}
      />
    </View>
  );
};

export default OrderDetailsScreen;
