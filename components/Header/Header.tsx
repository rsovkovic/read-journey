'use client';

import { logout as logoutApi } from '@/app/api/auth';
import toast from 'react-hot-toast';
import MainNavigation from '../MainNavigation/MainNavigation';
import { MobileMenu } from '../MobileMenu/MobileMenu';
import { UserBar } from '../UseBar/UseBar';
import { useAuthStore } from '@/lib/store/authStore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AxiosError } from 'axios';
import { Button } from '../Ui/Button';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setLogout, isLoggedIn } = useAuthStore();
  const router = useRouter();
  if (!isLoggedIn) return null;

  const handleLogout = async () => {
    const toastId = toast.loading('Logging out...');

    try {
      await logoutApi();

      toast.success('Successfully logged out!', { id: toastId });
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;

      const errorMessage =
        err.response?.data?.message || 'Server error during logout';
      toast.error(errorMessage, { id: toastId });
    } finally {
      setLogout();

      if (isMenuOpen) setIsMenuOpen(false);

      router.push('/register');
    }
  };

  return (
    <header className="w-full">
      <div className="container pt-8">
        <div className="bg-secondary-bg flex h-20 items-center justify-between rounded-3xl px-5 sm:px-7">
          <div className="flex items-center gap-2">
            <svg className="h-4.25 w-10.5" aria-hidden="true">
              <use href="/sprite.svg#icon-logo" />
            </svg>

            <span className="text-foreground hidden text-lg font-bold tracking-tighter uppercase md:block">
              Read Journey
            </span>
          </div>
          <nav aria-label="Main Navigation" className="hidden md:block">
            <MainNavigation />
          </nav>
          <div className="flex items-center gap-4">
            <UserBar />
            <Button
              type="submit"
              variant="outline"
              onClick={handleLogout}
              className="hidden px-5 md:block"
            >
              Log out
            </Button>
            <button className="md:hidden" onClick={() => setIsMenuOpen(true)}>
              <svg className="h-7 w-7 stroke-white">
                <use href="/sprite.svg#icon-burger-menu" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onLogout={handleLogout}
      />
    </header>
  );
}
