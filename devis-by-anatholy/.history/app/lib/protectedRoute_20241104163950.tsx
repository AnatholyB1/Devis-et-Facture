"use client";
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

const unprotectedRoutes = ['/login', '/register'];

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { status } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated' && !unprotectedRoutes.includes(pathname)) {
      router.push('/login');
    }
  }, [status, pathname, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'authenticated' || unprotectedRoutes.includes(pathname)) {
    return <>{children}</>;
  }

  return null;
};

export default ProtectedRoute;