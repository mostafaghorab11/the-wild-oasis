import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useUser } from '../features/authentication/useUser';
import Spinner from './Spinner';

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-grey-50);
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isPending, isAuthenticated } = useUser();
  
  console.log(isAuthenticated);

  if (isPending)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  if (!isAuthenticated && !isPending) navigate('/login');

  if (isAuthenticated) return <>{children}</>;
}

export default ProtectedRoute;
