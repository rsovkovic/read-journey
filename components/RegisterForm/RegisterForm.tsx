'use client';
import axios from 'axios';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from '@/utils/validationSchemas';
import { register as registerUser, RegisterData } from '@/app/api/auth';
import toast from 'react-hot-toast';
import { Input } from '../Ui/Input';
import { Button } from '../Ui/Button';

export const RegisterForm = () => {
  const setLogin = useAuthStore((state) => state.setLogin);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterData) => {
    try {
      const response = await registerUser(data);
      setLogin(response);
      toast.success('Registration successful!');
      router.push('/recommended');
    } catch (error: unknown) {
      if (axios.isAxiosError(error))
        toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-118 flex-col gap-5"
    >
      <div className="flex flex-col gap-3">
        <Input
          label="Name:"
          {...register('name')}
          autoComplete="name"
          placeholder="Ilona Ratushniak"
          error={errors.name?.message}
        />

        <Input
          label="Mail:"
          {...register('email')}
          autoComplete="username"
          placeholder="Your@email.com"
          error={errors.email?.message}
        />

        <Input
          label="Password:"
          {...register('password')}
          type={showPassword ? 'text' : 'password'}
          autoComplete="new-password"
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
          Registration
        </Button>
        <Link
          href="/login"
          className="hover:text-foreground text-sm text-(--text-secondary) underline transition-colors"
        >
          Already have an account?
        </Link>
      </div>
    </form>
  );
};
