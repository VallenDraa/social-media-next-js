'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFormState } from 'react-hook-form';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  PasswordInput,
} from '@/components/ui';
import { loginValidator, login, type Login, setAccessToken } from '@/lib/auth';
import { SubmitButton } from '@/components/ui/submit-button';
import { useAppDispatch } from '@/lib/store';

export function LoginForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const form = useForm<Login>({
    resolver: zodResolver(loginValidator),
    defaultValues: { email: '', password: '' },
  });

  const { isSubmitting } = useFormState(form);

  async function onSubmit(data: Login) {
    const result = await login(data);

    if ('error' in result) {
      toast.error(result.message);
    } else {
      dispatch(setAccessToken(result.data.accessToken));
      router.push('/');
    }
  }

  return (
    <Form {...form}>
      <form className='grid gap-4' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>email</FormLabel>
              <FormControl>
                <Input placeholder='johndoe@gmail.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>password</FormLabel>
              <FormControl>
                <PasswordInput placeholder='imMoreThan8Characters' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton text='bold' isSubmitting={isSubmitting}>
          login
        </SubmitButton>
      </form>
    </Form>
  );
}
