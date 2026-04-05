'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { useHydrated } from '@/hooks/useHydrated';

export default function RootPage() {
  const router = useRouter();
  const isHydrated = useHydrated();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  useEffect(() => {
    if (!isHydrated) return;

    if (isLoggedIn) {
      router.replace('/recommended');
    } else {
      router.replace('/register');
    }
  }, [isHydrated, isLoggedIn, router]);

  return null;
}
