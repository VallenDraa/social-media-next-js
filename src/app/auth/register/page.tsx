import { Button } from '@/components/ui/button';
import { register } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default function RegisterPage() {
  return (
    <form
      action={async formData => {
        'use server';

        await register(formData);
        redirect('/auth/login');
      }}
    >
      <input type='text' name='username' placeholder='username' />
      <input type='text' name='email' placeholder='email' />
      <input type='text' name='password' placeholder='password' />
      <input
        type='text'
        name='confirm-password'
        placeholder='confirm-password'
      />

      <Button>Register</Button>
    </form>
  );
}
