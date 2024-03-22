import { View, Text, Image, Pressable } from "react-native";
import React, { useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import products from "@assets/data/products";
import { defaultPizzaImage } from "@/components/ProductListItem";
import Button from "@components/Buttons";

const sizes = ["S", "M", "L", "XL"];

const ProductScreen = () => {
  const [isSelected, SetIsSelected] = useState("M");
  const { id } = useLocalSearchParams();
  const product = products.find((p) => p.id.toString() === id);

  const addToCart = () => {
    console.warn("Product", isSelected);
  };

  if (!product) return <Text className="flex-1">Product not found</Text>;
  return (
    <View className="m-2 flex-1">
      <Stack.Screen options={{ title: product?.name }} />
      {/* <Text className="text-2xl">ProductScreen: {id}</Text> */}
      <Image
        className="w-full my-1 aspect-square"
        source={{ uri: product?.image || defaultPizzaImage }}
        resizeMode="contain"
      ></Image>
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
