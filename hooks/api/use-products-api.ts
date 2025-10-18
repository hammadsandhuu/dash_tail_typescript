"use client";

import { useQuery } from "@tanstack/react-query";
import { getProductsApi, GetProductsResponse } from "@/api/product/products.api";

/* ============ GET PRODUCTS HOOK ============ */
export const useGetProductsQuery = (options?: { enabled?: boolean }) => {
  return useQuery<GetProductsResponse>({
    queryKey: ["products"],
    queryFn: getProductsApi,
    retry: 1,
    ...options,
  });
};
