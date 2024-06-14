'use client';

import React from 'react';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { getErrorMessage } from '@/shared/utils/error-parser';
import { Form } from '@/shared/components/ui/form';
import { Button, buttonVariants } from '@/shared/components/ui/button';
import { FormFieldItem } from '@/shared/components/ui/form-field-item';
import { useRouter } from 'next/navigation';
import { type Login } from '../types/login.types';
import { loginValidator } from '../validators/login.validator';
import { login } from '../actions/login.action';

export function LoginForm() {
  const router = useRouter();

  const form = useForm<Login>({
    resolver: zodResolver(loginValidator),
    defaultValues: { email: '', password: '' },
  });

  const handleSubmit = async (data: Login) => {
    try {
      const response = await login(data);
      toast.success(response.message);
      router.push('/');
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-8'>
        <FormFieldItem
          control={form.control}
          name='email'
          placeholder='john@doe.com'
          label='Email'
        />
        <FormFieldItem
          control={form.control}
          name='password'
          type='password'
          placeholder='superSecretPassword123'
          label='Password'
        />

        <div className='flex flex-col justify-center'>
          <Button className='w-full' type='submit'>
            Submit
          </Button>

          <Link
            href='/auth/register'
            className={buttonVariants({ variant: 'link' })}
          >
            Register instead? Click here
          </Link>
        </div>
      </form>
    </Form>
  );
}
