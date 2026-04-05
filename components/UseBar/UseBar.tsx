'use client';
import { useAuthStore } from '@/lib/store/authStore';

export const UserBar = () => {
  const { user } = useAuthStore();

  const initial = user?.name ? user.name.charAt(0).toUpperCase() : 'U';

  return (
    <div className="flex items-center gap-2">
      <div className="text-foreground flex h-9 w-9 items-center justify-center rounded-full border border-(--input-border) bg-(--input-bg) text-base font-bold sm:h-10 sm:w-10 sm:text-lg">
        {initial}
      </div>
      <span className="text-foreground hidden font-bold lg:block">
        {user?.name || 'User'}
      </span>
    </div>
  );
};
