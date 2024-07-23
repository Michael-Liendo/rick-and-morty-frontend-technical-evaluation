'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

enum ERoutes {
  Characters = '/',
  Episodes = '/episodes',
}

export default function Navbar() {
  const pathname = usePathname();
  const DEFAULT_LINK_CLASSES = 'text-blue-600 border-b-2 border-blue-500';

  const routes = Object.keys(ERoutes);

  return (
    <div className="px-3 sm:px-14 py-5 flex items-center justify-between bg-blue-700/5 rounded-b-md">
      <h1 className="text-black text-xl sm:text-3xl font-semibold">
        <span className="text-sky-500"> Rick</span> and{' '}
        <span className="text-yellow-300">Morty</span>
      </h1>
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
    </div>
  );
}
