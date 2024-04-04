import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { Link, Stack } from "expo-router";
import Button from "@/components/Buttons";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View className="flex-1 justify-center p-5">
      <Stack.Screen options={{ title: "Sign In" }} />
      <Text>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="john@gmail.com"
        className="bg-tint-dark rounded-md mt-1 mb-5 p-2"
      />
      <Text>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="********"
        className="bg-tint-dark rounded-md mt-1 mb-5 p-2"
        secureTextEntry
      />
      <Button text={"Sign In"} />
      <Link
        href="/sign-up"
        className="self-center my-2 text-tint-light font-bold text-base"
      >
        Create an Account
      </Link>
    </View>
  );
};

export default SignIn;
