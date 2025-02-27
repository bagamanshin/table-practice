import { ComparisonSign } from "@/components/Table/types/ComparisonSign";

const COMPARISON_SIGNS: Record<
  ComparisonSign,
  (a: string | number, b: string | number) => boolean
> = {
  '<': (a, b) => a < b,
  '>': (a, b) => a > b,
  '>=': (a, b) => a >= b,
  '<=': (a, b) => a <= b,
  '=': (a, b) => a == b,
}

export default COMPARISON_SIGNS;