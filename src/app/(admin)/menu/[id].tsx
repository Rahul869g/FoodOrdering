import { View, Text, Image, Pressable } from "react-native";
import React, { useState } from "react";
import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import products from "@assets/data/products";
import { defaultPizzaImage } from "@/components/ProductListItem";
import Button from "@components/Buttons";
import { useCart } from "@/providers/CartProvider";
import { PizzaSize } from "@/types";
import { FontAwesome } from "@expo/vector-icons";
const sizes: PizzaSize[] = ["S", "M", "L", "XL"];

const ProductScreen = () => {
  const { addItem } = useCart();
  const [isSelected, SetIsSelected] = useState<PizzaSize>("M");
  const { id } = useLocalSearchParams();
  const product = products.find((p) => p.id.toString() === id);

  const router = useRouter();
  const addToCart = () => {
    if (!product) return;
    addItem(product, isSelected);
    router.push("/cart");
  };

  if (!product) return <Text className="flex-1">Product not found</Text>;
  return (
    <View className="m-2 flex-1">
      <Stack.Screen
        options={{
          title: "Menu",
          headerRight: () => (
            <Link href={`/(admin)/menu/create?id=${id}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={25}
                    color={"#1f2d3d"}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          )
        }}
      />
      <Stack.Screen options={{ title: product?.name }} />
      {/* <Text className="text-2xl">ProductScreen: {id}</Text> */}
      <Image
        className="w-full my-1 aspect-square"
        source={{ uri: product?.image || defaultPizzaImage }}
        resizeMode="contain"
      ></Image>

      <Text className="text-xl mx-2 font-extrabold ">
        Name: {product?.name}
      </Text>

      <Text className="text-xl mx-2 font-extrabold ">
        Price: ${product?.price}
      </Text>
    </View>
  );
};

export default ProductScreen;
