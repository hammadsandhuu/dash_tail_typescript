"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

export interface UserRow {
  id: number;
  name: string;
  email: string;
  avatar: string;
  title: string;
  role: string;
  details: {
    city: string;
    experience: string;
    post: string;
  };
}

export const usersColumns: ColumnDef<UserRow>[] = [
  {
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{user.name}</span>
            <span className="text-xs text-muted-foreground">{user.email}</span>
          </div>
        </div>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => <span>{row.original.title}</span>,
    enableSorting: true,
  },
  {
    accessorKey: "role",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        variant="soft"
        className={`capitalize ${
          row.original.role === "Active"
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
        }`}
      >
        {row.original.role}
      </Badge>
    ),
    enableSorting: true,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex justify-end">
        <Button
          size="icon"
          variant="outline"
          className="h-8 w-8 border-none hover:bg-destructive/10"
          onClick={() => console.log("Delete", row.original.id)}
        >
          <Icon icon="heroicons:trash" className="h-5 w-5 text-destructive" />
        </Button>
      </div>
    ),
  },
];
