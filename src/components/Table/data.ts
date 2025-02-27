import { Row } from "@/components/Table/types/Row";

const generateInitialData = (size: number): Row[] => {
  const generateItem = (index: number): Row => ({
    id: index,
    name: 'Проект А',
    estimate: index * 2,
    class: 'A',
    tkp: { ob: index * 3, smr: index * 4, total: index * 5 },
    purchases: { mat: index * 2, ob: index * 3, total: index * 4 },
    estimated: { ob: index * 2, smr: index * 3, other: index * 4, total: index * 5 },
    stage: 'Обычный',
    subRows: [{
      id: `${index}.${index}`,
      name: 'Проект А.А',
      estimate: index * 2,
      class: 'A',
      tkp: { ob: index * 3, smr: index * 4, total: index * 5 },
      purchases: { mat: index * 2, ob: index * 3, total: index * 4 },
      estimated: { ob: index * 2, smr: index * 3, other: index * 4, total: index * 5 },
      stage: 'Обычный',
      subRows: [{
        id: `${index}.${index}.${index}`,
        name: 'Проект A.A',
        estimate: index * 2,
        class: 'A',
        tkp: { ob: index * 3, smr: index * 4, total: index * 5 },
        purchases: { mat: index * 2, ob: index * 3, total: index * 4 },
        estimated: { ob: index * 2, smr: index * 3, other: index * 4, total: index * 5 },
        stage: 'Обычный',
      }]
    }]
  });

  return Array.from({ length: size }).map((_, index) => generateItem(index));
};

const initialData = generateInitialData(30_000);

export default initialData;
