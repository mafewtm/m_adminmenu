"use client"

import React, { useEffect, useState } from "react";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Icon } from "@iconify/react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  onDoubleClick?: (row: any) => void
}

export default function DataTable<TData, TValue>({
  columns,
  data,
  onDoubleClick,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState<any>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter,
    },
  })

  return (
    <div className='pr-3'>
      <div className="flex flex-row h-fit items-center mb-5 rounded-md border border-zinc-700 shadow-md">
        <Input
          placeholder="Search"
          onChange={e => table.setGlobalFilter(String(e.target.value))}
          className="border-none"
        />
        <Icon icon="carbon:search" className="mr-2 text-zinc-300" />
      </div>
      <div className="rounded-md border border-zinc-700 shadow">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className='border-zinc-700 hover:bg-zinc-800'>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className='w-48 text-zinc-400'>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className='border-zinc-700 hover:bg-zinc-700'
                  onDoubleClick={() => onDoubleClick?.(row)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className='bg-zinc-700 shadow border-none hover:text-zinc-300 hover:bg-zinc-600'
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className='bg-zinc-700 shadow border-none hover:text-zinc-300 hover:bg-zinc-600'
        >
          Next
        </Button>
      </div>
   </div>
  )
}
