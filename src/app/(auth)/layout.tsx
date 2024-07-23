'use client';
import { useAuth } from '@/store/user';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useAuth();
  if (user) {
    redirect('/');
  }
  return <div>{children}</div>;
}
