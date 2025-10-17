"use client";

import Card from "@/components/ui/card-snippet";
import ProductTable from "./product-table";

const Page = () => {
  return (
    <div className=" space-y-6">
      <Card title="All Product List">
        <ProductTable />
      </Card>
    </div>
  );
};

export default Page;
