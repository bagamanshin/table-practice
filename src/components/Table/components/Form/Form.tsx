import React, { useRef } from 'react';
import { AutoForm, SubmitField } from 'uniforms-unstyled';

import List from '@/components/Table/components/Form/components/List/List';
import ListItem from '@/components/Table/components/Form/components/ListItem/ListItem';
import SelectField from '@/components/Table/components/Form/components/SelectField/SelectField';
import { FilterItemType } from '@/components/Table/types/FilterItemType';
import DisplayIf from '@/components/Table/components/Form/components/DisplayIf/DisplayIf';
import TextField from '@/components/Table/components/Form/components/TextField/TextField';
import schema from '@/components/Table/components/Form/FormSchema';

type FormModel = { filters: FilterItemType[] };

const DynamicForm = ({
  setFilters,
}: {
  setFilters: React.Dispatch<React.SetStateAction<FilterItemType[]>>;
}) => {
  const formRef = useRef<null>(null);
  return (
    <div className='h-full'>
      <AutoForm<FormModel>
        ref={formRef}
        schema={schema}
        onChangeModel={(model, details) => {
          const { key, value } = details;
          const field = key.split('.').at(-1)!;
          const index = key.split('.').at(-2)!;
          if (field === 'column' && ['name', 'stage'].includes(value as string)) {
            const dataLayer = model.filters[Number(index)] as FilterItemType;
            const { comparisonSign, ...rest } = dataLayer;
            formRef.current?.change(`filters.${index}`, rest);
          }
        }}
        onSubmit={(formModel) => {
          console.log('Submit form', formModel);
          setFilters(formModel.filters);
        }}
      >
        <List name="filters" className='flex flex-col gap-5 mb-3'>
          <ListItem name="$" >
            <SelectField name="column" />
            <DisplayIf<FormModel> name="" condition={(context) => {
              const index = context.name.at(-1)!;
              const dataLayer = context.model.filters.at(Number(index));

              return Boolean(dataLayer && ['name', 'stage'].includes(dataLayer.column));
            }}>
              <>
                <SelectField name="comparisonSign" options={[{ label: 'Равно', value: '=' }]} />
                <TextField name="value" placeholder='Значение' />
              </>
            </DisplayIf>
            <DisplayIf<FormModel> name="" condition={(context) => {
              const index = context.name.at(-1)!;
              const dataLayer = context.model.filters.at(Number(index));

              return Boolean(dataLayer && !['name', 'stage'].includes(dataLayer.column));
            }}>
              <>
                <SelectField name="comparisonSign" options={[
                  { label: 'Равно', value: '=' },
                  { label: 'Больше', value: '>' },
                  { label: 'Больше или равно', value: '>=' },
                  { label: 'Меньше', value: '<' },
                  { label: 'Меньше или равно', value: '<=' },
                ]} />
                <TextField name="value" placeholder='Значение' />
              </>
            </DisplayIf>

          </ListItem>
        </List>
        <div className='text-right border-[#E1E1E4] border-t mt-4 pt-4'>
          <input
            type="button"
            value="Сбросить"
            className='rounded-[4px] border p-[9px_10px] cursor-pointer text-[14px] leading-4 font-medium'
            onClick={() => {
              console.log('ref', formRef);
              formRef.current?.reset();
              setFilters([]);
            }}
          />
          <SubmitField className='rounded-[4px] p-[9px_10px] cursor-pointer text-[14px] leading-4 font-medium text-white bg-[#05B365] ml-2' value="Применить" />
        </div>
      </AutoForm>
    </div>
  );
};

export default DynamicForm;
