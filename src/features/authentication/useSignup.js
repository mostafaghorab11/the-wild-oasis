import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { signup as signupAPi } from '../../services/apiAuth';

export default function useSignup() {
  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupAPi,
    onSuccess: (user) => {
      console.log(user);
      toast.success(
        'Signup successful please verify the new account from your email address'
      );
    },
  });

  return { signup, isPending };
}
