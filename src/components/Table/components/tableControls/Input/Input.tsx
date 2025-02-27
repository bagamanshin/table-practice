'use client';

import { CellContext, ColumnDefTemplate } from "@tanstack/react-table";
import debounce from "lodash.debounce";
import { useMemo, useState } from "react";

import { Row } from "@/components/Table/types/Row";

const createInput = (type: 'text' | 'number') => {
  const Input: ColumnDefTemplate<CellContext<Row, string | number>> = ({ getValue, row, column, table }) => {
    const initialValue = getValue();
    const [value, setValue] = useState(initialValue);

    const onBlur = () => {
      table.options.meta?.updateData(row.original.id, column.id, value);
    };

    const updateData = useMemo(
      () =>
        debounce((newValue) => {
          table.options.meta?.updateData(row.original.id, column.id, newValue);
        }, 2000),
      [column, row, table],
    );

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      updateData(e.target.value);
    };

    return <input type={type} className='border border-none text-[10px] px-[6px] py-0 h-[17px]' value={value} onChange={onChange} onBlur={onBlur} />;
  };

  return Input;
}

const InputText = createInput('text');
const InputNumber = createInput('number');

export {
  InputNumber,
  InputText,
};
