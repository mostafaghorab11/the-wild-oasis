// import { useQuery } from '@tanstack/react-query';
// import { getCurrentUser } from '../../services/apiAuth';

// export function useUser() {
//   const { isPending, data: user } = useQuery({
//     queryKey: ['user'],
//     queryFn: getCurrentUser,
//   });

//   return { isPending, user, isAuthenticated: user?.role === 'authenticated' };
// }

import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../services/apiAuth';

export function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
  });

  return { isLoading, user, isAuthenticated: user?.role === 'authenticated' };
}
