import React from 'react';
import Text from '@/features/shared/components/ui/text';
import { LoginForm } from '@/features/auth/components/login-form';

export default function LoginPage() {
  return (
    <>
      <header className='mb-6'>
        <Text display='h2' as='h1'>
          Login
        </Text>
        <Text display='p'>
          Login now to access all the features of the app.
        </Text>
      </header>
      <LoginForm />
    </>
  );
}
