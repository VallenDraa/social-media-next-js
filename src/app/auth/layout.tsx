import React from 'react';

export type AuthLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function AuthLayout(props: AuthLayoutProps) {
  return (
    <section className='mx-auto flex min-h-screen w-full max-w-xl flex-col justify-center px-4'>
      {props.children}
    </section>
  );
}
