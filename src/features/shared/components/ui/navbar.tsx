'use client';

import {
  ImageIcon,
  MagnifyingGlassIcon,
  PersonIcon,
} from '@radix-ui/react-icons';
import Link from 'next/link';
import React from 'react';
import { Text } from './text';
import { cn } from '../../utils/shadcn';
import { buttonVariants } from './button';
import { usePathname } from 'next/navigation';

export const navbarItems = [
  { name: 'posts', icon: <ImageIcon fontSize={20} />, url: '/' },
  { name: 'friends', icon: <PersonIcon fontSize={20} />, url: '/friends' },
  { name: 'search', icon: <MagnifyingGlassIcon fontSize={20} />, url: '/s' },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className='w-full rounded-t-lg bg-secondary p-1.5 shadow'>
      <ul className='flex justify-between gap-4'>
        {navbarItems.map(item => (
          <Link
            className={cn(
              buttonVariants({
                variant: pathname === item.url ? 'default' : 'ghost',
              }),
              'flex h-auto grow flex-col items-center p-0 pt-1.5',
            )}
            href={item.url}
            key={item.name}
          >
            <div
              className={cn(
                pathname === item.url
                  ? 'text-primary-foreground'
                  : 'text-muted-foreground',
              )}
            >
              {item.icon}
            </div>

            <Text
              as='span'
              display='muted'
              className={cn(
                'capitalize',
                pathname === item.url && 'text-primary-foreground',
              )}
            >
              {item.name}
            </Text>
          </Link>
        ))}
      </ul>
    </nav>
  );
}
