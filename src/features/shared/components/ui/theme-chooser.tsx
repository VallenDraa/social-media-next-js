'use client';

import React from 'react';
import { DesktopIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu';
import { Button } from './button';
import { Skeleton } from './skeleton';

export function ThemeChooser() {
  const [mounted, setMounted] = React.useState(false);
  const { theme, setTheme } = useTheme();

  // UseEffect only runs on the client, so now we can safely show the UI
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Skeleton className='h-9 w-9' />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='w-9 px-0'>
          {theme === 'light' && <SunIcon className='h-5 w-5' />}
          {theme === 'dark' && <MoonIcon className='h-5 w-5' />}
          {theme === 'system' && <DesktopIcon className='h-5 w-5' />}

          <span className='sr-only'>Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem
          onClick={() => {
            setTheme('light');
          }}
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setTheme('dark');
          }}
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setTheme('system');
          }}
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
