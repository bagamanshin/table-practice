import SortAscIcon from "@/components/Table/components/icons/SortAsc";
import SortDefaultIcon from "@/components/Table/components/icons/SortDefault";
import SortDescIcon from "@/components/Table/components/icons/SortDesc";
import { Row } from "@/components/Table/types/Row";
import { flexRender, useReactTable } from "@tanstack/react-table";
import { clsx } from "clsx";

const TableHeader = ({ table }: { table: ReturnType<typeof useReactTable<Row>> }) => {
  return <thead className='sticky left-0 top-0 z-30'>
    {table.getHeaderGroups().map((headerGroup) => (
      <tr key={headerGroup.id}>
        {headerGroup.headers.map((header) => {
          const rowSpan = header.column.columnDef.meta?.rowSpan;

          if (
            !header.isPlaceholder &&
            rowSpan !== undefined &&
            header.id === header.column.id
          ) {
            return null;
          }

          const sortIcon = (() => {
            if (!header.column.getCanSort()) {
              return null;
            }

            switch (header.column.getIsSorted()) {
              case 'asc':
                return <SortAscIcon />;

              case 'desc':
                return <SortDescIcon />;

              default:
                return <SortDefaultIcon />;
            }
          })();

          return (
            <th
              className='border-[0.5px] border-[#E1E1E4] whitespace-nowrap select-none bg-[#F9FAFB] font-medium py-[2px] px-[6px]'
              key={header.id}
              colSpan={header.colSpan}
              rowSpan={rowSpan}
              onClick={header.column.getToggleSortingHandler()}
            >
              <div className={clsx('flex items-center gap-2', header.subHeaders.length > 1 ? 'justify-center' : 'justify-start')}>
                {flexRender(header.column.columnDef.header, header.getContext())}
                {sortIcon}
                {// header.column.getIsSorted() === 'asc' ? (
                  // <SortAscIcon />
                  // ) : header.column.getIsSorted() === 'desc' ? (
                  // <SortDescIcon />
                  // ) : header.column.getCanSort() ? (
                  // <SortDefault />
                  // ) : (
                  // null
                  // )
                }
              </div>
            </th>
          );
        })}
      </tr>
    ))}
  </thead>
};

export default TableHeader;
