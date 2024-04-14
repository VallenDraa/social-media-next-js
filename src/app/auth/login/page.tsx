import { Button } from '@/components/ui/button';
import { login } from '@/lib/auth';

export default function LoginPage() {
  return (
    <form
      action={async formData => {
        'use server';

        const response = await login(formData);
      }}
    >
      <input type='text' name='email' placeholder='email' />
      <input type='text' name='password' placeholder='password' />

      <Button>Login</Button>
    </form>
  );
}
