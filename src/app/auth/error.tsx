'use client';

import { ErrorFragment } from '@/components/fragments';
import { Button } from '@/components/ui';

export default function AuthError(props: {
  error: unknown;
  reset: () => void;
}) {
  return (
    <ErrorFragment
      title='auth error!'
      description='an error occurred while trying to authenticate, please try again!'
    >
      <Button onClick={props.reset}>try again</Button>
    </ErrorFragment>
  );
}
