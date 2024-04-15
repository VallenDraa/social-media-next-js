import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const containerVariants = cva('flex flex-col px-4 mx-auto w-full', {
  variants: {
    variant: { big: 'max-w-screen-lg', default: 'max-w-lg' },
  },
  defaultVariants: { variant: 'default' },
});

export type ContainerProps = {
  as?: React.ElementType;
} & React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof containerVariants>;

export function Container({
  className,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  as: Component = 'div',
  variant,
  children,
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn(containerVariants({ variant }), className)}
      {...props}
    >
      {children}
    </Component>
  );
}
