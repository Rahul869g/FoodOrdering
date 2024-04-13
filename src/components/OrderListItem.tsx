import { View, Text, Pressable } from "react-native";
import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link, useSegments } from "expo-router";
import { Tables } from "@/database.types";

dayjs.extend(relativeTime);
type OrderListItemProps = {
  order: Tables<"orders">;
};
const OrderListItem = ({ order }: OrderListItemProps) => {
  const segments = useSegments();
  return (
    <Link href={`/${segments[0]}/orders/${order.id}`} asChild>
      <Pressable className="flex flex-row items-center justify-between p-3 rounded-lg bg-tint-dark">
        <View className="">
          <Text className="font-bold my-1">Order #{order.id}</Text>
          <Text className="text-gray">{dayjs(order.created_at).fromNow()}</Text>
        </View>
        <Text className="font-medium">{order.status}</Text>
      </Pressable>
    </Link>
  );
};

export default OrderListItem;
