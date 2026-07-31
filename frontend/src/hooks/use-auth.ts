'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

interface LoginPayload {
  email: string;
  password: string;
}

interface User {
  role: string;
  full_name: string;
  email: string;
  hospital_slug?: string;
  hospital_name?: string;
}

interface LoginResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: LoginPayload) => api.post<LoginResponse>('/auth/login', data),
    onSuccess: (data) => {
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));
      queryClient.setQueryData(['user'], data.user);

      const role = data.user.role?.toLowerCase();
      if (role === 'county_admin' || role === 'admin') {
        router.push('/county');
      } else if (data.user.hospital_slug) {
        router.push(`/${data.user.hospital_slug}`);
      } else {
        router.push('/');
      }
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    queryClient.clear();
    router.push('/auth/login');
  };
}

export function useCurrentUser(): User | null {
  if (typeof window === 'undefined') return null;
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

export function useRequireAuth() {
  const user = useCurrentUser();
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!checked) {
      if (!user) {
        router.push('/auth/login');
      }
      setChecked(true);
    }
  }, [user, router, checked]);

  return user;
}
