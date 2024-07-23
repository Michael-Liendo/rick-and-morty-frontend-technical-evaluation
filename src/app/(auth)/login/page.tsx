'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/store/user';
import { redirect } from 'next/navigation';
import { type FormEvent, useState } from 'react';

export default function Login() {
  const { setUser } = useAuth();
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!username || !password) return;

    setUser({ username });
    redirect('/');
  }

  return (
    <>
      <div className="fixed right-0 top-0 z-10 flex h-screen w-screen flex-col items-center justify-center drop-shadow-lg backdrop-blur-[2px] bg-[#00000055] bg-no-repeat bg-cover bg-slate-800 bg-[url('https://images.unsplash.com/photo-1720712738661-9c0dcb92f06d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
        <form onSubmit={handleSubmit}>
          <Card className="w-[400px]">
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Log In into you account to view the Rick and Morty Data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="username">Username</label>
                  <Input
                    id="name"
                    placeholder="admin"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="password">Password</label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="admin"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="submit" className="w-full">
                Login
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </>
  );
}
