'use client';

import { useAuthStore } from '@/lib/store/authStore';
import { useHydrated } from '@/hooks/useHydrated';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { PageLoader } from '../Loader/Loader';

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useAuthStore();
  const hydrated = useHydrated();
  const router = useRouter();
  const pathname = usePathname();
  const isPublicPath = pathname === '/login' || pathname === '/register';

  useEffect(() => {
    if (!hydrated) return;

    if (!isLoggedIn && !isPublicPath) {
      router.replace('/register');
    }

    if (isLoggedIn && isPublicPath) {
      router.replace('/recommended');
    }
  }, [isLoggedIn, hydrated, router, pathname, isPublicPath]);

  if (!hydrated) return <PageLoader />;

  if (!isLoggedIn && !isPublicPath) return null;

  if (isLoggedIn && isPublicPath) return null;

  return <>{children}</>;
};
