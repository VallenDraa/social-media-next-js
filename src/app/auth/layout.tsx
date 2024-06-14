import React from 'react';

export type AuthLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function AuthLayout(props: AuthLayoutProps) {
  return (
    <section className='flex min-h-screen flex-col justify-center'>
      {props.children}
    </section>
  );
}
