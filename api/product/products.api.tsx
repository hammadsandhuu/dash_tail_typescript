import http from "@/utils/http";
import { API_RESOURCES } from "@/utils/api-endpoints";

/* ============ TYPES ============ */
export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  stock?: number;
  category?: string;
  images?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface GetProductsResponse {
  success: boolean;
  message?: string;
  data: {
    products: Product[];
  };
}

/* ============ PRODUCT APIs ============ */

// Get all products
export async function getProductsApi(): Promise<GetProductsResponse> {
  const { data } = await http.get<GetProductsResponse>(`${API_RESOURCES.PRODUCTS}?limit=2`);
  console.log("Products API Response:", data);
  return data;
}
