import './globals.css';
import React from 'react';

import { type Metadata } from 'next';
import { Toaster } from '@/features/shared/components/ui/sonner';
import { AppProviders } from '@/features/shared/components/app-providers';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className='font-mono'>
        <AppProviders>
          <div className='mx-auto w-full max-w-xl px-4'>{children}</div>
          <Toaster richColors position='bottom-center' closeButton />
        </AppProviders>
      </body>
    </html>
  );
}
