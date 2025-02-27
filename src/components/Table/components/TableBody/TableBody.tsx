import { useVirtualRows } from "@/components/Table/hooks/useVirtualRows";
import { Row } from "@/components/Table/types/Row";
import { flexRender, useReactTable } from "@tanstack/react-table";
import React from "react";

const TableBody = ({ scrollRef, table, columnsAmount }: { scrollRef: React.RefObject<HTMLDivElement>; table: ReturnType<typeof useReactTable<Row>>; columnsAmount: number }) => {
  const { rows } = table.getRowModel();
  const { before, after, virtualRows } = useVirtualRows({
    scrollRef,
    rowsCount: rows.length,
  });

  return (
    <tbody>
      <React.Fragment>
        {/* Fix the issue with a sticky table header and infinite scroll */}
        {before > 0 && (
          <tr>
            <td colSpan={columnsAmount} style={{ height: before }} />
          </tr>
        )}
        {virtualRows.map((virtualRow) => {
          const row = rows[virtualRow.index];

          return (
            <tr key={row.id} className='leading-[17px]'>
              {row.getVisibleCells().map((cell) => (
                <td className='border-[0.5px] border-[#E1E1E4]' key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          )
        }
        )}
        {after > 0 && (
          <tr>
            <td colSpan={columnsAmount} style={{ height: after }} />
          </tr>
        )}
      </React.Fragment>
    </tbody>
  )
};

export default TableBody;
