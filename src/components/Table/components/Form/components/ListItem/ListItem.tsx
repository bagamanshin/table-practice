import { connectField } from "uniforms";
import { AutoField, ListItemFieldProps } from "uniforms-unstyled";

import ListRemoveItem from "@/components/Table/components/Form/components/ListRemoveItem/ListRemoveItem";

const ListItem = connectField<ListItemFieldProps>(({
  children = <AutoField label={null} name="" />,
}: ListItemFieldProps) =>
(
  <div className="grid grid-cols-[auto_auto_auto_min-content] gap-2 items-center">
    {children}
    <ListRemoveItem name="" />
  </div>
), {
  initialValue: false,
});

export default ListItem;
