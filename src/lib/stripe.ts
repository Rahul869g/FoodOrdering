import { Alert } from "react-native";
import { supabase } from "./supabase";
import {
  initPaymentSheet,
  presentPaymentSheet
} from "@stripe/stripe-react-native";

// Payments
const fetchPaymentSheetParams = async (amount: number) => {
  // Create payment session for our customer
  const { data, error } = await supabase.functions.invoke("payment-sheet", {
    body: { amount }
  });
  console.log("fps", data);
  if (data) {
    return data;
  }
  Alert.alert(`Error: ${error?.message ?? "no data"}`);
  return {};
};
export const initialisePaymentSheet = async (amount: number) => {
  console.log("Initialised Payment Sheet, For : ", amount);
  // setLoading(true);
  const { paymentIntent, publishableKey } = await fetchPaymentSheetParams(
    amount
  );
  console.log("initialisePaymentSheet", paymentIntent, publishableKey);
  if (!publishableKey || !paymentIntent) return;
  const { error } = await initPaymentSheet({
    merchantDisplayName: "Example, Inc.",
    paymentIntentClientSecret: paymentIntent,
    defaultBillingDetails: {
      name: "Jane Doe"
    }
  });
  console.log("error**", error);
};
export const openPaymentSheet = async () => {
  const { error } = await presentPaymentSheet();

  if (error) {
    Alert.alert(`Error code: ${error.code}`, error.message);
    return false;
  } else {
    Alert.alert("Success", "Your order is confirmed!");
    return true;
  }
};
