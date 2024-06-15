import React from 'react';
import { ReactQueryLoader } from '@/features/shared/lib/react-query-loader';
import { CurrentUserProfileDropdown } from '@/features/users/components/current-user-profile-dropdown';
import { prefetchCurrentUser } from '@/features/users/query/get-current-user.query';
import { ThemeChooser } from '@/features/shared/components/ui/theme-chooser';
import Text from '@/features/shared/components/ui/text';

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ReactQueryLoader loaders={[prefetchCurrentUser]}>
      <header className='flex items-center justify-between py-4 pb-2'>
        <Text as='h1' display='h3'>
          dotcom.
        </Text>

        <div className='flex items-center justify-end gap-4'>
          <ThemeChooser />

          <CurrentUserProfileDropdown />
        </div>
      </header>
      <main className='grow'>{children}</main>
      <footer className='flex  justify-between py-2 text-[0.65rem] text-neutral-500'>
        <Text display='sm'>Made By VallenDra With 💖</Text>
        <Text display='sm'>{new Date().getFullYear()}</Text>
      </footer>
    </ReactQueryLoader>
  );
}
