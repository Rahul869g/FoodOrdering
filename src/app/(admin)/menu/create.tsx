import { View, Text, TextInput, Image, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import Button from "@/components/Buttons";
import { defaultPizzaImage } from "@/components/ProductListItem";
import * as ImagePicker from "expo-image-picker";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import {
  useDeleteProduct,
  useInsertProduct,
  useProductItem,
  useUpdateProduct
} from "@/api/products";
import { randomUUID } from "expo-crypto";
import * as FileSystem from "expo-file-system";
import { supabase } from "@/lib/supabase";
import { decode } from "base64-arraybuffer";
import RemoteImage from "@/components/RemoteImage";

const create = () => {
  const [image, setImage] = useState<string | null>(null);

  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(
    typeof idString === "string" ? idString : idString?.[0]
  );

  const isUpdating = !!id;

  const { mutate: insertProduct } = useInsertProduct();
  const { mutate: updateProduct } = useUpdateProduct();
  const { data: updatingProduct } = useProductItem(id);
  const { mutate: deleteProduct } = useDeleteProduct();

  const router = useRouter();

  useEffect(() => {
    if (updatingProduct) {
      setName(updatingProduct.name);
      setPrice(updatingProduct.price.toString());
      setImage(updatingProduct.image);
    }
  }, [updatingProduct]);

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
  const onSubmit = () => {
    if (isUpdating) {
      onUpdate();
    } else {
      onCreate();
    }
  };
  const onCreate = async () => {
    if (!validateInput()) {
      return;
    }

    const imagePath = await uploadImage();

    insertProduct(
      {
        name,
        price: parseFloat(price),
        image: imagePath
      },
      {
        onSuccess: () => {
          console.warn("Product Created", name, price);
          //Save in the DB
          resetFields();
          router.back();
        }
      }
    );
  };
  const onUpdate = async () => {
    if (!validateInput()) {
      return;
    }
    const imagePath = await uploadImage();

    updateProduct(
      {
        id,
        name,
        price: parseFloat(price),
        image: imagePath
      },
      {
        onSuccess: () => {
          console.warn("Product Updated", name, price);

          resetFields();
          router.back();
          router.back();
        }
      }
    );
  };
  const onDelete = () => {
    if (!validateInput()) {
      return;
    }
    deleteProduct(id, {
      onSuccess: () => {
        console.warn("Product Deleted", name);
        resetFields();
        router.replace("/(admin)");
      }
    });
  };
  const confirmDelete = () => {
    Alert.alert("Confirm ", "Are you sure ?", [
      { text: "Cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: onDelete
      }
    ]);
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

  const uploadImage = async () => {
    if (!image?.startsWith("file://")) {
      return;
    }

    const base64 = await FileSystem.readAsStringAsync(image, {
      encoding: "base64"
    });
    const filePath = `${randomUUID()}.png`;
    const contentType = "image/png";
    const { data, error } = await supabase.storage
      .from("product-images")
      .upload(filePath, decode(base64), { contentType });

    if (data) {
      return data.path;
    }
  };
  return (
    <View className="flex-1 justify-center p-2">
      <Stack.Screen
        options={{ title: isUpdating ? "Update Product" : "Create Product" }}
      />
      <RemoteImage
        path={image}
        fallback={defaultPizzaImage}
        className="w-1/4 h-1/4 self-center aspect-square rounded"
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
      <Button onPress={onSubmit} text={isUpdating ? "Update" : "Create"} />
      {isUpdating && (
        <Text className=" self-center text-blue-dark" onPress={confirmDelete}>
          Delete
        </Text>
      )}
    </View>
  );
};

export default create;
