'use client';

import { useAuth } from '@/store/user';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarFallback } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

enum ERoutes {
  Characters = '/',
  Episodes = '/episodes',
}

export default function Navbar() {
  const { user, logOut } = useAuth();
  const pathname = usePathname();
  const DEFAULT_LINK_CLASSES = 'text-blue-600 border-b-2 border-blue-500';

  const routes = Object.keys(ERoutes);

  return (
    <div className="px-3 sm:px-14 py-5 flex items-center justify-between bg-blue-700/5 rounded-b-md">
      <h1 className="text-black text-xl sm:text-3xl font-semibold">
        <span className="text-sky-500"> Rick</span> and{' '}
        <span className="text-yellow-300">Morty</span>
      </h1>
      <div className="flex items-center space-x-5">
        <nav>
          <ul className="flex items-center space-x-4">
            {routes.map((key) => (
              <li
                key={key}
                className={`${
                  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
                  pathname === (ERoutes as any)[key] && DEFAULT_LINK_CLASSES
                }`}
              >
                {/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
                <Link href={(ERoutes as any)[key]}>{key}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarFallback className="bg-slate-700 text-white">
                {user?.username[0].toLocaleUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuLabel>
              <span>{user?.username}</span>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <button
                type="button"
                onClick={() => {
                  logOut();
                }}
              >
                Log out
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
