import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateCurrentUser } from '../../services/apiAuth';

export default function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isPending } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: (updatedUser) => {
      toast.success('User updated successfully');
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.setQueryData(['user'], updatedUser);
    },
    onError: (error) => toast.error(error.message),
  });
  return { updateUser, isPending };
}
