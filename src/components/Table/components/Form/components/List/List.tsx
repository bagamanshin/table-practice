import React, {
  Children,
  cloneElement,
  isValidElement,
  ReactElement,
} from 'react';
import { connectField, filterDOMProps, HTMLFieldProps } from 'uniforms';

import ListAddItem from '@/components/Table/components/Form/components/ListAddItem/ListAddItem';

import ListItem from '../ListItem/ListItem';

export type ListFieldProps = HTMLFieldProps<
  unknown[],
  HTMLUListElement,
  { itemProps?: object }
>;

const List = ({
  children = <ListItem name="$" />,
  itemProps,
  label,
  value,
  ...props
}: ListFieldProps) => (
  <>
    <ul {...filterDOMProps(props)}>
      {value?.map((item, itemIndex) =>
        Children.map(children, (child, childIndex) =>
          isValidElement(child)
            ? cloneElement(child as ReactElement, {
              key: `${itemIndex}-${childIndex}`,
              name: child.props.name?.replace('$', '' + itemIndex),
              ...itemProps,
            })
            : child,
        ),
      )}
    </ul>
    <div className='text-left'>
      <ListAddItem className='text-[14px] text-[#05B365] leading-[18px] font-medium' name="$" />
    </div>
  </>
);

export default connectField<ListFieldProps>(List);