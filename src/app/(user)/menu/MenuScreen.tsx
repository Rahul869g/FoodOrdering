import { FlatList } from "react-native";
import ProductListItem from "@/components/ProductListItem";
import products from "@assets/data/products";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function MenuScreen() {
  return (
    <FlatList
      data={products}
      renderItem={({ item }) => <ProductListItem product={item} />}
      numColumns={2}
      contentContainerStyle={{ gap: 10, padding: 10 }}
      columnWrapperStyle={{ gap: 10 }}
    />
  );
}
