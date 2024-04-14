import { register } from '@/lib/actions/auth';

export default function RegisterPage() {
  return (
    <form action={register}>
      <input type='text' name='username' />
      <input type='text' name='email' />
      <input type='text' name='password' />
      <input type='text' name='confirm-password' />
    </form>
  );
}
