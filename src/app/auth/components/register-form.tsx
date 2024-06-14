'use client';

import React from 'react';
import { type Register } from '../types/register.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { registerValidator } from '../validators/register.validator';
import { toast } from 'sonner';
import { getErrorMessage } from '@/shared/utils/error-parser';
import { register } from '../actions/register.action';
import { Form } from '@/shared/components/ui/form';
import { Button, buttonVariants } from '@/shared/components/ui/button';
import { FormFieldItem } from '@/shared/components/ui/form-field-item';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export function RegisterForm() {
  const router = useRouter();

  const form = useForm<Register>({
    resolver: zodResolver(registerValidator),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleSubmit = async (data: Register) => {
    try {
      await register(data);
      toast.success('Registration successful!');
      router.push('/auth/login');
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-8'>
        <FormFieldItem
          control={form.control}
          name='username'
          placeholder='john_doe'
          label='Username'
        />
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
        <FormFieldItem
          control={form.control}
          name='confirmPassword'
          type='password'
          placeholder='superSecretPassword123'
          label='Confirm Password'
        />

        <div className='flex flex-col justify-center'>
          <Button className='w-full' type='submit'>
            Submit
          </Button>

          <Link
            href='/auth/login'
            className={buttonVariants({ variant: 'link' })}
          >
            Login instead? Click here
          </Link>
        </div>
      </form>
    </Form>
  );
}
