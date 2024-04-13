import { View, Text, Image } from "react-native";
import React from "react";
import { OrderItem, Tables } from "@/types";
import { defaultPizzaImage } from "./ProductListItem";
import RemoteImage from "./RemoteImage";

type OrderListItemProps = {
  item: { products: Tables<"products"> } & Tables<"order_items">;
};

const OrderItemListItem = ({ item }: OrderListItemProps) => {
  return (
    <View className="bg-tint-dark flex-1  p-1 rounded-md flex-row items-center">
      <RemoteImage
        className="aspect-square self-center w-[75px]"
        path={item?.products?.image}
        fallback={defaultPizzaImage}
        resizeMode="contain"
      />
      <View className="flex-1 ml-5  gap-y-[0.5px]">
        <Text className="font-bold">{item?.products?.name || "App"}</Text>
        <View className="flex-row gap-2">
          <Text className="text-tint-light font-bold">
            ${item?.products?.price?.toFixed(2) || 9.9}
          </Text>
          <Text className="font-medium">Size: {item.size || "M"}</Text>
        </View>
      </View>
      <View>
        <Text className="font-bold mr-2">{item.quantity || 2}</Text>
      </View>
    </View>
  );
};

export default OrderItemListItem;
