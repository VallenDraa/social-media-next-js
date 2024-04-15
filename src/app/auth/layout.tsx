import { Container } from '@/components/ui';
import React from 'react';

export default function AuthLayout(props: { children: React.ReactNode }) {
  return (
    <Container className='justify-center supports-dvh:min-h-dvh'>
      {props.children}
    </Container>
  );
}
