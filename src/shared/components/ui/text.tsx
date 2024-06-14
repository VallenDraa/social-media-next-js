import { cn } from '@/shared/utils/shadcn';
import React from 'react';

export type TextType =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'p'
  | 'blockquote'
  | 'inline-code'
  | 'lead'
  | 'lg'
  | 'sm'
  | 'muted';

export type TextProps = Readonly<{
  children: React.ReactNode;
  className?: string;
  display: TextType;
  as?: React.ElementType;
}>;

export default function Text(props: TextProps) {
  const { children, className, display, as = 'p' } = props;

  if (display === 'blockquote') {
    return (
      <blockquote className='mt-6 border-l-2 pl-6 italic'>
        {children}
      </blockquote>
    );
  }

  if (display === 'inline-code') {
    <code className='relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold'>
      {children}
    </code>;
  }

  return React.createElement(
    as,
    {
      className: cn(className, {
        'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl':
          display === 'h1',
        'scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0':
          display === 'h2',
        'scroll-m-20 text-2xl font-semibold tracking-tight': display === 'h3',
        'scroll-m-20 text-xl font-semibold tracking-tight': display === 'h4',
        'leading-7': display === 'p',
        'text-xl text-muted-foreground': display === 'lead',
        'text-lg font-semibold': display === 'lg',
        'text-sm font-medium leading-none': display === 'sm',
        'text-sm text-muted-foreground': display === 'muted',
      }),
    },
    children,
  );
}
