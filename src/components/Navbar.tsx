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

  routes.forEach((key, index) => {
    console.log(`${key} has index ${index}`);
  });
  return (
    <div className="px-14 py-5 flex items-center justify-between bg-blue-700/5 rounded-b-md">
      <h1 className="text-black text-3xl font-semibold">Rick and Morty</h1>
      <nav>
        <ul className="flex items-center space-x-4">
          {routes.map((key) => (
            <li
              key={key}
              className={`${pathname === ERoutes[key] && DEFAULT_LINK_CLASSES}`}
            >
              <Link href={ERoutes[key]}>{key}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
