'use client';
import { redirect } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/store/user';

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useAuth();
  if (!user) {
    redirect('/login');
  }
  return (
    <>
      <Navbar />
      <div className="mx-4">{children}</div>
    </>
  );
}
