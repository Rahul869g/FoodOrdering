import { View, Text, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import { Link, Stack } from "expo-router";
import Button from "@/components/Buttons";
import { supabase } from "@/lib/supabase";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signUp = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  };

  return (
    <View className="flex-1 justify-center p-5">
      <Stack.Screen options={{ title: "Sign Up" }} />
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
      <Button
        onPress={signUp}
        disabled={loading}
        text={loading ? "Creating an account..." : "Create Account"}
      />
      <Link
        href="/sign-in"
        className="self-center my-2 text-tint-light font-bold text-base"
      >
        Sign In
      </Link>
    </View>
  );
};

export default SignUp;
