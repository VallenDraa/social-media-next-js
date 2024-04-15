import { buttonVariants } from '@/components/ui';
import { RegisterForm } from '../_components';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui';
import Link from 'next/link';

export const dynamic = 'force-static';

export default function RegisterPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>register to socmed.</CardTitle>
        <CardDescription>
          connect, share, and explore - join our community today!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RegisterForm />
      </CardContent>
      <CardFooter className='justify-center'>
        <Link
          href='/auth/login'
          className={buttonVariants({ variant: 'link', size: 'sm' })}
        >
          login here instead
        </Link>
      </CardFooter>
    </Card>
  );
}
