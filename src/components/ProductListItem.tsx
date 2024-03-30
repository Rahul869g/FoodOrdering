import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { Product } from "../types";
import products from "@assets/data/products";
import { Link, useSegments } from "expo-router";

type ProductListItemProps = {
  product: Product;
};

export const defaultPizzaImage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";

const ProductListItem = ({ product }: ProductListItemProps) => {
  const segments = useSegments();
  console.log(segments);
  return (
    <Link asChild href={`/${segments[0]}/menu/${product.id}`}>
      <Pressable
        key={product.id}
        className="bg-[#e1e1e1] max-w-[50%] p-3 rounded-2xl flex-1"
      >
        <Image
          className="w-full aspect-square"
          source={{ uri: product.image || defaultPizzaImage }}
          resizeMode="contain"
        ></Image>
        <Text className="text-lg font-bold my-2 ">{product.name}</Text>
        <Text className="font-bold text-tint-light">${product.price}</Text>
      </Pressable>
    </Link>
  );
};

export default ProductListItem;
