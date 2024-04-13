import { View, Text, Image, Pressable, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { defaultPizzaImage } from "@/components/ProductListItem";
import Button from "@components/Buttons";
import { useCart } from "@/providers/CartProvider";
import { PizzaSize } from "@/types";
import { useProductItem } from "@/api/products";
import RemoteImage from "@/components/RemoteImage";
const sizes: PizzaSize[] = ["S", "M", "L", "XL"];

const ProductScreen = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);

  const { data: product, error, isLoading } = useProductItem(id);

  const { addItem } = useCart();
  const [isSelected, SetIsSelected] = useState<PizzaSize>("M");

  const router = useRouter();
  const addToCart = () => {
    if (!product) return;
    addItem(product, isSelected);
    router.push("/cart");
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Failed to fetch Products</Text>;
  }
  return (
    <View className="m-2 flex-1">
      <Stack.Screen options={{ title: product?.name }} />
      {/* <Text className="text-2xl">ProductScreen: {id}</Text> */}
      <RemoteImage
        path={product?.image}
        fallback={defaultPizzaImage}
        className="w-full my-1 aspect-square"
        resizeMode="contain"
      />
      <Text className="text-lg mx-2 font-bold">Select Size</Text>
      <View className="flex flex-row justify-around my-4">
        {sizes.map((size) => (
          <Pressable
            onPress={() => {
              SetIsSelected(size);
            }}
            key={size}
            className={`${
              isSelected == size ? `bg-gray-dark opacity-50` : `bg-none`
            }  aspect-square w-[50]  rounded-full  justify-center items-center`}
          >
            <Text
              onPress={() => SetIsSelected(size)}
              className={`${
                isSelected == size ? "text-gray-darkest" : "text-gray-dark"
              }text-xl mx-2 font-medium`}
            >
              {size}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text className="text-xl mx-2 font-extrabold mt-auto">
        Price: ${product?.price}
      </Text>
      <Button onPress={addToCart} text="Add to cart" />
    </View>
  );
};

export default ProductScreen;
