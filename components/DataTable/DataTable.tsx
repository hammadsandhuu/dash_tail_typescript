"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
  SortingState,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { Skeleton } from "@/components/ui/skeleton";

interface ServerDataTableProps<TData> {
  columns: ColumnDef<TData, any>[];
  fetchData: (params: {
    page: number;
    pageSize: number;
    sortBy?: string;
    sortDir?: "asc" | "desc";
  }) => Promise<{ data: TData[]; total: number }>;
  pageSize?: number;
  renderExpanded?: (row: TData) => React.ReactNode;
  height?: number;
}

export function DataTable<TData>({
  columns,
  fetchData,
  pageSize = 20,
  renderExpanded,
  height = 600,
}: ServerDataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [data, setData] = useState<TData[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [expanded, setExpanded] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sort = sorting[0];
    const sortBy = sort?.id;
    const sortDir = sort?.desc ? "desc" : "asc";

    setLoading(true);
    fetchData({ page, pageSize, sortBy, sortDir })
      .then((res) => {
        setData(res.data);
        setTotal(res.total);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      })
      .finally(() => setLoading(false));
  }, [page, sorting, fetchData, pageSize]);

  const table = useReactTable({
    data,
    columns,
    pageCount: Math.ceil(total / pageSize),
    state: { expanded, sorting },
    onSortingChange: setSorting,
    onExpandedChange: setExpanded,
    manualPagination: true,
    manualSorting: true,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const { rows } = table.getRowModel();

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => 56,
    overscan: 5,
  });
  const virtualRows = rowVirtualizer.getVirtualItems();
  return (
    <div className="w-full">
      {/* ---------- Table Header ---------- */}
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  onClick={
                    header.column.getCanSort()
                      ? header.column.getToggleSortingHandler()
                      : undefined
                  }
                  className={
                    header.column.getCanSort()
                      ? "cursor-pointer select-none"
                      : ""
                  }
                >
                  <div className="flex items-center gap-1">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {header.column.getIsSorted() === "asc" && (
                      <Icon icon="heroicons:chevron-up" className="h-4 w-4" />
                    )}
                    {header.column.getIsSorted() === "desc" && (
                      <Icon icon="heroicons:chevron-down" className="h-4 w-4" />
                    )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
      </Table>

      {/* ---------- Table Body (Virtualized) ---------- */}
      <div
        ref={tableContainerRef}
        className="relative overflow-auto border rounded-md"
        style={{ height }}
      >
        {loading ? (
          <div className="p-4 space-y-2">
            {[...Array(10)].map((_, i) => (
              <Skeleton key={i} className="h-6 w-full rounded-md" />
            ))}
          </div>
        ) : (
          <Table className="absolute top-0 left-0 w-full">
            <TableBody
              style={{
                height: rowVirtualizer.getTotalSize(),
                position: "relative",
              }}
            >
              {virtualRows.map((virtualRow) => {
                const row = rows[virtualRow.index];
                return (
                  <React.Fragment key={row.id}>
                    <TableRow
                      ref={rowVirtualizer.measureElement}
                      className="absolute left-0 right-0"
                      style={{
                        transform: `translateY(${virtualRow.start}px)`,
                      }}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>

                    {/* Expanded Row */}
                    {row.getIsExpanded() && renderExpanded && (
                      <TableRow
                        className="absolute left-0 right-0 bg-muted/20"
                        style={{
                          transform: `translateY(${virtualRow.start + 48}px)`,
                        }}
                      >
                        <TableCell colSpan={columns.length}>
                          <div className="pl-12 py-2">
                            {renderExpanded(row.original)}
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>
        )}
      </div>

      {/* ---------- Pagination ---------- */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-muted-foreground">
          Page {page + 1} of {Math.ceil(total / pageSize)}
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
          >
            Prev
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={(page + 1) * pageSize >= total}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
