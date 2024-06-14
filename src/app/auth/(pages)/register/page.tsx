import React from 'react';
import { RegisterForm } from '@/app/auth/components/register-form';
import Text from '@/shared/components/ui/text';

export default function RegisterPage() {
  return (
    <>
      <header className='mb-6'>
        <Text display='h2' as='h1'>
          Register
        </Text>
        <Text display='p'>
          Register now to access all the features of the app.
        </Text>
      </header>
      <RegisterForm />
    </>
  );
}
