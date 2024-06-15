import { ReactQueryLoader } from '@/features/shared/lib/react-query-loader';
import { CurrentUserProfileDropdown } from '@/features/users/components/current-user-profile-dropdown';
import { prefetchCurrentUser } from '@/features/users/query/get-current-user.query';

export default function Home() {
  return (
    <ReactQueryLoader loaders={[prefetchCurrentUser]}>
      <CurrentUserProfileDropdown />
    </ReactQueryLoader>
  );
}
