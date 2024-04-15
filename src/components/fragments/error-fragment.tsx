import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui';
import { CrossCircledIcon } from '@radix-ui/react-icons';

export type ErrorFragmentProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export function ErrorFragment(props: ErrorFragmentProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <CrossCircledIcon className='size-5 text-red-500 dark:text-red-700' />
          {props.title}
        </CardTitle>
        <CardDescription>{props.description}</CardDescription>
      </CardHeader>
      <CardContent>{props.children}</CardContent>
    </Card>
  );
}
