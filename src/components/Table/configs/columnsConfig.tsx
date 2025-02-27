// import { type ColumnDef } from "@tanstack/react-table";

import { ColumnDef, RowData } from "@tanstack/react-table";

import ClosedDirectoryIcon from "@/components/Table/components/icons/ClosedDirectory";
import FileIcon from "@/components/Table/components/icons/File";
import OpenedDirectoryIcon from "@/components/Table/components/icons/OpenedDirectory";
import RowActionsIcon from "@/components/Table/components/icons/RowActions";
import { InputNumber, InputText } from "@/components/Table/components/tableControls/Input/Input";
import { Row } from "@/components/Table/types/Row";


declare module '@tanstack/react-table' {
  //allows us to define custom properties for our columns
  interface ColumnMeta<TData extends RowData, TValue> {
    rowSpan?: number
  }
}

const columns: ColumnDef<Row, string | number>[] = [
  {
    id: 'expander',
    header: () => null,
    meta: {
      rowSpan: 2,
    },
    cell: ({ row }) =>
      row.original.subRows ? (
        <div
          className='select-none cursor-pointer px-[6px]'
          onClick={() => {
            row.getToggleExpandedHandler()();
          }}
        >
          {row.getIsExpanded() ? <OpenedDirectoryIcon /> : <ClosedDirectoryIcon />}
        </div>

      ) : <div className='select-none px-[6px]'><FileIcon /></div>,
  },
  {
    accessorKey: 'id',
    header: '№',
    enableSorting: true,
    size: 250,
    meta: {
      rowSpan: 2,
    },
  },
  {
    accessorKey: 'name',
    header: 'Наименование',
    cell: InputText,
    enableSorting: true,
    meta: {
      rowSpan: 2,
    },
  },
  {
    accessorKey: 'estimate',
    header: 'Смета',
    cell: InputNumber,
    enableSorting: true,
    meta: {
      rowSpan: 2,
    },
  },
  {
    accessorKey: 'class',
    header: 'Класс-р',
    cell: InputText,
    enableSorting: true,
    meta: {
      rowSpan: 2,
    },
  },
  {
    header: 'ТКП, руб.',
    columns: [
      { accessorKey: 'tkp.ob', header: 'ОБ', cell: InputNumber, enableSorting: true },
      { accessorKey: 'tkp.smr', header: 'СМР', cell: InputNumber, enableSorting: true },
      { accessorKey: 'tkp.total', header: 'Итого', cell: InputNumber, enableSorting: true },
    ],
  },
  {
    header: 'Закупки, руб.',
    columns: [
      { accessorKey: 'purchases.mat', header: 'МАТ', cell: InputNumber, enableSorting: true },
      { accessorKey: 'purchases.ob', header: 'ОБ', cell: InputNumber, enableSorting: true },
      {
        accessorKey: 'purchases.total',
        header: 'Итого',
        cell: InputNumber,
        enableSorting: true,
      },
    ],
  },
  {
    header: 'Расчетная, руб.',
    columns: [
      { accessorKey: 'estimated.ob', header: 'ОБ', cell: InputNumber, enableSorting: true },
      { accessorKey: 'estimated.smr', header: 'СМР', cell: InputNumber, enableSorting: true },
      {
        accessorKey: 'estimated.other',
        header: 'Прочие',
        cell: InputNumber,
        enableSorting: true,
      },
      {
        accessorKey: 'estimated.total',
        header: 'Итого',
        cell: InputNumber,
        enableSorting: true,
      },
    ],
  },
  {
    accessorKey: 'stage',
    header: 'Вид этапа',
    cell: ({ row }) =>
      <span>{row.original.stage}</span>,
    enableSorting: true,
    meta: {
      rowSpan: 2,
    },
  },
  {
    id: 'row-actions',
    header: () => null,
    meta: {
      rowSpan: 2,
    },
    cell: () => <div className='select-none px-[6px]'><RowActionsIcon /></div>,
  },
];

export default columns;
