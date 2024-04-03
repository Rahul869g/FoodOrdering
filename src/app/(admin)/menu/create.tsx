import { View, Text, TextInput, Image } from "react-native";
import React, { useState } from "react";
import Button from "@/components/Buttons";
import { defaultPizzaImage } from "@/components/ProductListItem";
import * as ImagePicker from "expo-image-picker";
import { Stack } from "expo-router";

const create = () => {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");
  const onCreate = () => {
    if (!validateInput()) {
      return;
    }
    console.warn("onCreate", name, price);

    //Save in the DB
    resetFields();
  };

  const validateInput = () => {
    setError("");
    if (!name) {
      setError("Please enter valid name");
      return false;
    }

    if (!price) {
      setError("Please enter valid price");
      return false;
    }
    if (isNaN(parseFloat(price))) {
      setError("Price is not a number");
      return false;
    }
    return true;
  };

  const resetFields = () => {
    setName("");
    setPrice("");
  };
  return (
    <View className="flex-1 justify-center p-2">
      <Stack.Screen options={{ title: "Create Product" }} />
      <Image
        source={{ uri: image || defaultPizzaImage }}
        className="w-1/2 h-1/2 self-center aspect-square rounded"
      />

      <Text
        onPress={pickImage}
        className="self-center font-bold text-blue-light my-2"
      >
        Select Image
      </Text>
      <Text className="text-gray-darkest text-lg">Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="name"
        className="rounded-md mt-1 mb-5 p-2 bg-tint-dark"
      />
      <Text className="text-gray-darkest text-lg">Price($)</Text>
      <TextInput
        value={price}
        onChangeText={setPrice}
        placeholder="9.99"
        keyboardType="numeric"
        className="rounded-md mt-1 mb-5 p-2 bg-tint-dark"
      />
      <Text className="text-[#12efee]  text-lg">{error}</Text>
      <Button onPress={onCreate} text="Create" />
    </View>
  );
};

export default create;
