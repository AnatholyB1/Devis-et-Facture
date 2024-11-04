import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'authenticated') {
    return <>{children}</>;
  }

  return null;
};

export default ProtectedRoute;