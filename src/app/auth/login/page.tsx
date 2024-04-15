import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  buttonVariants,
} from '@/components/ui';
import { LoginForm } from '../_components';
import Link from 'next/link';

export const dynamic = 'force-static';

export default function LoginPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>login to socmed.</CardTitle>
        <CardDescription>
          connect, share, and explore - join our community today!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
      <CardFooter className='justify-center'>
        <Link
          href='/auth/register'
          className={buttonVariants({ variant: 'link', size: 'sm' })}
        >
          register here instead
        </Link>
      </CardFooter>
    </Card>
  );
}
