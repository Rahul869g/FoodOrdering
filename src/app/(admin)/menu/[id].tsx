import { View, Text, Image, Pressable, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import { defaultPizzaImage } from "@/components/ProductListItem";
import Button from "@components/Buttons";
import { useCart } from "@/providers/CartProvider";
import { PizzaSize } from "@/types";
import { FontAwesome } from "@expo/vector-icons";
import { useProductItem } from "@/api/products";
import RemoteImage from "@/components/RemoteImage";

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
      <RemoteImage
        path={product?.image}
        fallback={defaultPizzaImage}
        className="w-full my-1 aspect-square"
        resizeMode="contain"
      />

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
