"use client"

import {Container, Grid, Pagination} from "@mantine/core";
import {useQuery} from "@tanstack/react-query";
import {
  ColumnFiltersState,
  getCoreRowModel, getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel, SortingState,
  useReactTable, VisibilityState
} from "@tanstack/react-table";
import {Book} from "@/models/book";
import BookCard from "@/components/BookCard";
import bookApi from "@/api/book";
import {useCartStore} from "@/store/cartStore";
import React from "react";

export default function BookListingPage() {

  const {addBookToCart} = useCartStore()

  const {data} = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const response = await bookApi.book.getBooks()
      return response.body["data"] as Book[];
    },
  })

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    renderFallbackValue: undefined,
    data: data || [],
    columns: [],
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 24,
        pageIndex: 0,
      }
    }
  })

  return (
    <Container>
      <Grid m="md" justify="end">
        <Pagination
          onChange={(page) => table.setPageIndex(page - 1)}
          total={Math.ceil((data?.length || 0) / table.getState().pagination.pageSize)}
        />
      </Grid>
      <Grid>
        {table.getRowModel().rows.map((row, index) => {
          const book = row.original;
          return (
            <Grid.Col span={{base: 12, xs: 6, sm: 4, md: 3}} key={index}>
              <BookCard
                {...book}
                onAddToCart={addBookToCart}
              />
            </Grid.Col>
          )
        })}
      </Grid>
    </Container>
  );
}
