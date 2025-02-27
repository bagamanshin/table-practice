export interface Row {
  id: number | string;
  name: string;
  estimate: number;
  class: string;
  tkp: { ob: number; smr: number; total: number };
  purchases: { mat: number; ob: number; total: number };
  estimated: { ob: number; smr: number; other: number; total: number };
  stage: string;
  subRows?: Row[];
}
