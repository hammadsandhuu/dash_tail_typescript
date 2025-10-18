"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import Image from "next/image";

export interface ProductRow {
  id: string;
  name: string;
  category: string;
  price: number;
  sale_price?: number;
  in_stock: boolean;
  on_sale: boolean;
  quantity: number;
  shippingFee: number;
  tags: string[];
  createdAt: string;
  description: string;
}

export const productColumns: ColumnDef<ProductRow>[] = [
  {
    accessorKey: "name",
    header: "Product",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="flex items-center gap-3">
          {/* You can replace with real image if available */}
          <div className="relative w-10 h-10 rounded-md overflow-hidden bg-muted">
            <Image
              src={""}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-sm">{product.name}</span>
            <span className="text-xs text-muted-foreground">
              {product.category}
            </span>
          </div>
        </div>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const { price, sale_price, on_sale } = row.original;
      return on_sale ? (
        <div>
          <span className="line-through text-muted-foreground text-xs mr-1">
            ${price}
          </span>
          <span className="text-green-600 font-semibold">${sale_price}</span>
        </div>
      ) : (
        <span>${price}</span>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "quantity",
    header: "Stock",
    cell: ({ row }) =>
      row.original.in_stock ? (
        <Badge className="bg-green-100 text-green-800">In Stock</Badge>
      ) : (
        <Badge className="bg-red-100 text-red-800">Out of Stock</Badge>
      ),
  },
  {
    accessorKey: "shippingFee",
    header: "Shipping",
    cell: ({ row }) => `$${row.original.shippingFee}`,
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) =>
      new Date(row.original.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    enableSorting: true,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={() => console.log("View product", row.original.id)}
      >
        <Icon icon="heroicons:eye" className="h-4 w-4" />
      </Button>
    ),
  },
];
