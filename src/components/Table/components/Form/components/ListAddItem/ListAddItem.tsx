import cloneDeep from 'lodash.clonedeep';
import React from 'react';
import {
  connectField,
  filterDOMProps,
  HTMLFieldProps,
  joinName,
  useField,
} from 'uniforms';

export type ListAddFieldProps = HTMLFieldProps<unknown, HTMLSpanElement>;

function ListAdd({
  disabled,
  name,
  readOnly,
  value,
  ...props
}: ListAddFieldProps) {
  const nameParts = joinName(null, name);
  const parentName = joinName(nameParts.slice(0, -1));
  const parent = useField<{ maxCount?: number }, unknown[]>(
    parentName,
    {},
    { absoluteName: true },
  )[0];

  const limitNotReached =
    !disabled && !(parent.maxCount! <= parent.value!.length);

  function onAction(event: React.KeyboardEvent | React.MouseEvent) {
    if (
      limitNotReached &&
      !readOnly &&
      (!('key' in event) || event.key === 'Enter')
    ) {
      parent.onChange(parent.value!.concat([cloneDeep(value)]));
    }
  }

  return (
    <span
      {...filterDOMProps(props)}
      onClick={onAction}
      onKeyDown={onAction}
      role="button"
      tabIndex={0}
    >
      Добавить условие +
    </span>
  );
}

export default connectField<ListAddFieldProps>(ListAdd, {
  initialValue: false,
  kind: 'leaf',
});
