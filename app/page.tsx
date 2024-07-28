"use client"

import {Container, Grid, Input, Loader, Pagination, Select} from "@mantine/core";
import {useQuery} from "@tanstack/react-query";
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState
} from "@tanstack/react-table";
import {Book} from "@/models/book";
import BookCard from "@/components/cards/BookCard";
import bookApi, {BookQuery} from "@/api/book";
import {useCartStore} from "@/store/cartStore";
import React, {useState} from "react";
import DebouncedInput from "@/components/input/DebouncedInput";
import {ArrowDown, ArrowUp} from "lucide-react";

export default function BookListingPage() {

  const {addBookToCart} = useCartStore()

  const [query, setQuery] = useState<BookQuery>({
    title: "The lord of the rings"
  })
  const {data, isFetching} = useQuery({
    queryKey: ["books", query],
    queryFn: async () => {
      const response = await bookApi.book.getBooks(query)
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
    columns: [
      {
        id: "title",
        accessorKey: "title",
      },
      {
        id: "author",
        accessorKey: "author",
        sortingFn: (a, b) => {
          const authorA = a.original.authors[0]
          const authorB = b.original.authors[0]
          if (!authorA || !authorB) {
            return 0
          }
          return authorA.localeCompare(authorB)
        }
      },
      {
        id: "firstPublishedDate",
        accessorKey: "firstPublishedDate",
      },
      {
        id: "price",
        accessorKey: "price",
      }
    ],
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
      },
    }
  })

  return (
    <Container className="tw-space-y-4">
      <div className="tw-flex tw-flex-col sm:tw-flex-row tw-justify-between sm:tw-space-x-4 tw-space-y-2">
        <Input.Wrapper label="Search books">
          <DebouncedInput
            delay={500}
            value={query?.title}
            placeholder="Search books"
            className="tw-w-full sm:tw-w-[250px]"
            onChange={(title) => {
              setQuery({
                title: title
              })
            }}
          />
        </Input.Wrapper>
        <Input.Wrapper label="Sort by">
          <Select
            placeholder="Sort by"
            data={[
              {value: "title", label: "Sort by: Title"},
              {value: "firstPublishedDate", label: "Sort by: Published Date"},
              {value: "author", label: "Sort by: Author"},
              {value: "price", label: "Sort by: Price"},
            ]}
            leftSection={<div className="tw-cursor-pointer hover:tw-border" onClick={() => {
              table.setSorting([
                {
                  id: sorting[0]?.id,
                  desc: !(sorting[0]?.desc)
                }
              ])
            }}>
              {sorting[0]?.desc && <ArrowUp className="tw-w-4 tw-h-4"/>}
              {!(sorting[0]?.desc) && <ArrowDown className="tw-w-4 tw-h-4"/>}
            </div>}
            className="tw-w-full sm:tw-w-[250px]"
            onChange={(value) => {
              if (value) {
                table.setSorting([{
                  id: value,
                  desc: false
                }])
              }
            }}
          />
        </Input.Wrapper>
      </div>
      <div className="tw-flex tw-flex-row tw-justify-center sm:tw-justify-end">
        <Pagination
          siblings={1}
          size="sm"
          onChange={(page) => table.setPageIndex(page - 1)}
          total={Math.ceil((data?.length || 0) / table.getState().pagination.pageSize)}
        />
      </div>
      <Grid>
        {isFetching && (
          <div className="tw-w-full tw-h-[600px] tw-flex tw-flex-row tw-justify-center tw-items-center">
            <Loader size="xl"/>
          </div>
        )}
        {!isFetching && (data?.length === 0) && (
          <div className="tw-w-full tw-h-[600px] tw-flex tw-flex-row tw-justify-center tw-items-center">
            No books found
          </div>
        )}
        {!isFetching && Boolean(data?.length) && table.getRowModel().rows.map((row, index) => {
          const book = row.original;
          return (
            <Grid.Col span={{base: 12, xs: 6, sm: 4, md: 3}} key={index}>
              <div className="tw-h-[400px]">
                <BookCard
                  {...book}
                  onAddToCart={addBookToCart}
                />
              </div>
            </Grid.Col>
          )
        })}
      </Grid>
      <Grid m="md" justify="center">
        <Pagination
          size="sm"
          siblings={1}
          onChange={(page) => table.setPageIndex(page - 1)}
          total={Math.ceil((data?.length || 0) / table.getState().pagination.pageSize)}
        />
      </Grid>
    </Container>
  );
}
