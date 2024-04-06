import "react-native-url-polyfill/auto";
import * as SecureStore from "expo-secure-store";
import { createClient } from "@supabase/supabase-js";

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    SecureStore.setItemAsync(key, value);
  },
  removeItem: (key: string) => {
    SecureStore.deleteItemAsync(key);
  }
};

// if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
//   throw new Error("Supabase URL or key not defined");
// }

const supabaseUrl = "https://jkiqsdxsgzlehijocanj.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpraXFzZHhzZ3psZWhpam9jYW5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI0Mjk1NDcsImV4cCI6MjAyODAwNTU0N30.iZdNzUMB5yCYzVL57DWXLo27CXD2SMTwU7HI-1Y2yYU";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false
  }
});
