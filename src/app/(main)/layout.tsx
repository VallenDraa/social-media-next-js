import React from 'react';
import { ReactQueryLoader } from '@/features/shared/lib/react-query-loader';
import { CurrentUserProfileDropdown } from '@/features/users/components/current-user-profile-dropdown';
import { prefetchCurrentUser } from '@/features/users/query/get-current-user.query';
import { ThemeChooser } from '@/features/shared/components/ui/theme-chooser';

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ReactQueryLoader loaders={[prefetchCurrentUser]}>
      <header className='flex items-center justify-between py-4 pb-2'>
        <h1 className='text-lg font-semibold leading-7'>dotcom.</h1>

        <div className='flex items-center justify-end gap-4'>
          <ThemeChooser />

          <CurrentUserProfileDropdown />
        </div>
      </header>
      <main>{children}</main>
      <footer></footer>
    </ReactQueryLoader>
  );
}
