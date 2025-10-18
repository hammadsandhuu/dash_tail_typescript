"use client";

import { DataTable } from "@/components/DataTable/DataTable";
import { productColumns, ProductRow } from "@/components/DataTable/columns/product-columns";
import { useGetProductsQuery } from "@/hooks/api/use-products-api";

export default function ProductsPage() {
  const { data: productsData, isLoading } = useGetProductsQuery();

  // Fetch function to adapt to DataTable’s server pagination API
  const fetchProducts = async ({
    page,
    pageSize,
    sortBy,
    sortDir,
  }: {
    page: number;
    pageSize: number;
    sortBy?: string;
    sortDir?: "asc" | "desc";
  }): Promise<{ data: ProductRow[]; total: number }> => {
    // Normally you'd fetch using query params (page, limit, sort)
    // But since you already use RTK Query `useGetProductsQuery`, we can mock this part
    const products = productsData?.data?.products || [];

    const mapped: ProductRow[] = products.map((p: any) => ({
      id: p.id,
      name: p.name,
      category: p.category?.name || "N/A",
      price: p.price,
      sale_price: p.sale_price,
      in_stock: p.in_stock,
      on_sale: p.on_sale,
      quantity: p.quantity,
      shippingFee: p.shippingFee,
      tags: p.tags?.map((t: any) => t.name) || [],
      createdAt: p.createdAt,
      description: p.description,
    }));

    return {
      data: mapped,
      total: productsData?.data?.pagination?.total || mapped.length,
    };
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Products</h1>

      <DataTable<ProductRow>
        columns={productColumns}
        fetchData={fetchProducts}
        pageSize={10}
        height={600}
      />
    </div>
  );
}
