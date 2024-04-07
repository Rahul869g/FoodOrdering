import { supabase } from "@/lib/supabase";
import {
  Mutation,
  useMutation,
  useQuery,
  useQueryClient
} from "@tanstack/react-query";

export const useProductList = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*");
      if (error) {
        throw new Error(error.message);
      }
      return data;
    }
  });
};
export const useProductItem = (id: number) => {
  return useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return data;
    }
  });
};

export const useInsertProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    async mutationFn(data: any) {
      const { data: newProduct, error } = await supabase
        .from("products")
        .insert({
          name: data.name,
          price: data.price,
          image: data.image
        })
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return newProduct;
    },

    async onSuccess() {
      //refetch product
      await queryClient.invalidateQueries(["products"]);
    }
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    async mutationFn(data: any) {
      const { data: updatedProduct, error } = await supabase
        .from("products")
        .update({
          name: data.name,
          price: data.price,
          image: data.image
        })
        .eq("id", data.id)
        .select()
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return updatedProduct;
    },

    async onSuccess(_, { id }) {
      //refetch product
      await queryClient.invalidateQueries(["products"]);
      await queryClient.invalidateQueries(["products", id]);
    }
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    async mutationFn(id: number) {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) {
        throw new Error(error.message);
      }
    },

    async onSuccess() {
      //refetch product
      await queryClient.invalidateQueries(["products"]);
    }
  });
};
