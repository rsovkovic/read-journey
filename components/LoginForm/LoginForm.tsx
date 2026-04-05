'use client';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@/utils/validationSchemas';
import { login, LoginData } from '@/app/api/auth';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '@/lib/store/authStore';
import { Input } from '../Ui/Input';
import { Button } from '../Ui/Button';

export const LoginForm = () => {
  const setLogin = useAuthStore((state) => state.setLogin);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: yupResolver(loginSchema),
    mode: 'onTouched',
  });

  const emailValue = useWatch({
    control: control,
    name: 'email',
    defaultValue: '',
  });

  const passwordValue = useWatch({
    control: control,
    name: 'password',
    defaultValue: '',
  });

  const onSubmit = async (data: LoginData) => {
    try {
      const response = await login(data);
      setLogin(response);
      toast.success('Congratulations again!');
      router.push('/recommended');
    } catch (error: unknown) {
      if (axios.isAxiosError(error))
        toast.error(error.response?.data?.message || 'login error');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-118 flex-col gap-5"
    >
      <div className="flex flex-col gap-3">
        <Input
          label="Mail:"
          {...register('email')}
          value={emailValue}
          autoComplete="username"
          placeholder="Your@email.com"
          error={errors.email?.message}
        />

        <Input
          label="Password:"
          {...register('password')}
          value={passwordValue}
          type={showPassword ? 'text' : 'password'}
          autoComplete="current-password"
          placeholder="Yourpasswordhere"
          error={errors.password?.message}
        >
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-secondary hover:text-primary ml-2 flex items-center justify-center transition-colors"
          >
            <svg width="18" height="18" className="fill-current">
              {showPassword ? (
                <use href="/sprite.svg#icon-eye" />
              ) : (
                <use href="/sprite.svg#icon-eye-off" />
              )}
            </svg>
          </button>
        </Input>
      </div>

      <div className="mt-4 flex items-center gap-5">
        <Button type="submit" variant="primary" className="px-10">
          Login in
        </Button>
        <Link
          href="/register"
          className="hover:text-foreground text-sm text-(--text-secondary) underline transition-colors"
        >
          Don’t have an account?
        </Link>
      </div>
    </form>
  );
};
