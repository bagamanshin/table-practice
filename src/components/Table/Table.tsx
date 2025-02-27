'use client';

import {
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  RowData,
  useReactTable,
} from '@tanstack/react-table';
import get from 'lodash.get';
import React, { useRef, useState } from 'react';

import Drawer from '@/components/Table/components/Drawer/Drawer';
import TableSettings from '@/components/Table/components/icons/TableSettings';
import { FilterItemType } from '@/components/Table/types/FilterItemType';
import { Row } from '@/components/Table/types/Row';

import DynamicForm from './components/Form/Form';
import columns from './configs/columnsConfig';
import COMPARISON_SIGNS from '@/components/Table/constants/ComparisonSigns';
import initialData from '@/components/Table/data';
import TableHeader from '@/components/Table/components/TableHeader/TableHeader';
import TableBody from '@/components/Table/components/TableBody/TableBody';

declare module '@tanstack/table-core' {
  interface TableState {
    globalFilter: FilterItemType[]
  }
  interface TableMeta<TData extends RowData> {
    updateData: (rowId: Row['id'], columnId: string, value: string | number) => void
  }
}

const TableComponent = () => {
  const [data, setData] = useState<Row[]>(initialData);
  const [filters, setFilters] = useState<FilterItemType[]>([]);

  const [isTableSettingsOpen, setIsTableSettingsOpen] = useState(false);

  const table = useReactTable<Row>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: (row) => Boolean(row.original.subRows),
    getSubRows: (row) => row.subRows,
    globalFilterFn: (row) => {
      const result = filters.every(({ column, comparisonSign, value }) => {
        const comparisonOperator = COMPARISON_SIGNS[comparisonSign];

        return comparisonOperator(get(row.original, column), value);
      });

      return result;
    },
    state: {
      globalFilter: filters,
    },
    meta: {
      updateData: (rowId, columnId, value) => {
        setData((oldData) => {
          const updateNestedRow = (rows: Row[]): Row[] =>
            rows.map((row) => {
              if (row.id === rowId) {
                return { ...row, [columnId]: value };
              }
              if (row.subRows) {
                return { ...row, subRows: updateNestedRow(row.subRows) };
              }
              return row;
            });

          return updateNestedRow(oldData);
        });
      },
    },
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className='p-4 bg-white text-[10px] border border-[rgba(8,9,28,0.12)] rounded-[16px]'>

      <div className='flex justify-between items-center mb-2'>
        <h2 className='text-left text-[20px] leading-[26px] font-medium'>Структура бюджета</h2>
        <button className='border border-[#08091C1F] rounded-[4px] p-[9px] cursor-pointer' onClick={() => { setIsTableSettingsOpen(true) }}><TableSettings /></button>
      </div>

      <div className='max-h-[400px] overflow-y-auto' ref={scrollRef}>
        <table className='w-full border-separate border-spacing-0'>
          <TableHeader table={table} />
          <TableBody table={table} scrollRef={scrollRef} columnsAmount={columns.length} />
        </table>
      </div>

      <Drawer isOpen={isTableSettingsOpen} onClose={() => { setIsTableSettingsOpen(false) }}>
        <>
          <h3 className='text-[24px] leading-[30px] font-medium text-left mb-3'>Настройка</h3>
          <div className='flex-1'>
            <DynamicForm setFilters={setFilters} />
          </div>
        </>
      </Drawer>
    </div>
  );
};

export default TableComponent;
