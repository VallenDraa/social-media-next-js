import './globals.css';
import React from 'react';

import { type Metadata } from 'next';
import { Toaster } from '@/features/shared/components/ui/sonner';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en'>
      <body className='dark flex min-h-screen flex-col font-mono'>
        {children}
        <Toaster richColors position='bottom-center' closeButton />
      </body>
    </html>
  );
}
