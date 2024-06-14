import React from 'react';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './form';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import { Input } from './input';

export type FormFieldItemProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Readonly<
  Omit<
    React.ComponentProps<typeof FormField<TFieldValues, TName>>,
    'render'
  > & {
    type?: React.HTMLInputTypeAttribute;
    placeholder?: string;
    label?: string;
    description?: string;
    classNames?: {
      formItem?: string;
      formLabel?: string;
      formControl?: string;
      formDescription?: string;
      formMessage?: string;
      input?: string;
    };
  }
>;

export function FormFieldItem<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: FormFieldItemProps<TFieldValues, TName>) {
  const { label, type, description, placeholder, classNames, ...rest } = props;

  return (
    <FormField
      {...rest}
      render={({ field }) => (
        <FormItem className={classNames?.formItem}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl className={classNames?.formControl}>
            <Input
              type={type ?? 'text'}
              className={classNames?.input}
              placeholder={placeholder}
              {...field}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage className={classNames?.formMessage} />
        </FormItem>
      )}
    />
  );
}
