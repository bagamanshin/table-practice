import { type ComparisonSign } from "@/components/Table/types/ComparisonSign";

export type FilterItemType = {
  column: string;
  comparisonSign: ComparisonSign;
  value: number | string;
}