import { Children, ReactElement } from "react";
import { Context, UnknownObject, useForm } from "uniforms";

type DisplayIfProps<Model extends UnknownObject> = {
  name: string;
  children: ReactElement;
  condition: (context: Context<Model>, name: string) => boolean;
};

function DisplayIf<Model extends UnknownObject>({
  name,
  children,
  condition,
}: DisplayIfProps<Model>) {
  const uniforms = useForm<Model>();
  return condition(uniforms, name) ? Children.only(children) : null;
}

export default DisplayIf;
