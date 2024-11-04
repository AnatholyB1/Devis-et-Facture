"use client";
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';


const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { status } = useSession();
  const pathname = usePathname();
  const router = useRouter();


  useEffect(() => {
    if (status === 'unauthenticated' ) {
      router.push('api/auth/signin');
    }
  }, [status, pathname, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'authenticated') {
    return <>{children}</>;
  }

  return null;
};

export default ProtectedRoute;