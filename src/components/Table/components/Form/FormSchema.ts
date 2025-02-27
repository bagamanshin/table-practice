import SimpleSchema from "simpl-schema";
import SimpleSchema2Bridge from "uniforms-bridge-simple-schema-2";

const schema = new SimpleSchema({
  filters: {
    type: Array,
  },
  'filters.$': {
    type: Object,
    label: '',
  },
  'filters.$.column': {
    type: String,
    label: '',
    uniforms: {
      placeholder: 'Cтолбец',
      options: [
        { label: '№', value: 'id' },
        { label: 'Наименование', value: 'name' },
        { label: 'Смета', value: 'estimate' },
        { label: 'Класс-р', value: 'class' },
        { label: 'ТКП/ОБ', value: 'tkp.ob' },
        { label: 'ТКП/СМР', value: 'tkp.smr' },
        { label: 'ТКП/Итого', value: 'tkp.total' },
        { label: 'Закупки/МАТ', value: 'purchases.mat' },
        { label: 'Закупки/ОБ', value: 'purchases.ob' },
        { label: 'Закупки/Итого', value: 'purchases.total' },
        { label: 'Расчетная/ОБ', value: 'estimated.ob' },
        { label: 'Расчетная/СМР', value: 'estimated.smr' },
        { label: 'Расчетная/Прочие', value: 'estimated.other' },
        { label: 'Расчетная/Итого', value: 'estimated.total' },
        { label: 'Вид этапа', value: 'stage' },
      ],
    },
  },
  'filters.$.comparisonSign': {
    type: String,
    label: '',
    uniforms: {
      placeholder: 'Cравнение',
    },
  },
  'filters.$.value': {
    type: SimpleSchema.oneOf(Number, String),
    label: '',
  },
});

export default new SimpleSchema2Bridge({ schema });