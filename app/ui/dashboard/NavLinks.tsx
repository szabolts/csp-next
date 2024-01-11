'use client';

import { MdHome } from "react-icons/md";
import { MdLeaderboard } from "react-icons/md";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HiClipboardList } from "react-icons/hi";
import clsx from 'clsx';
import { SessionType } from "@/app/lib/definitions";


// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
// const links = [
//   { name: 'Overview', href: `/dashboard/${session?.userId}`, icon: MdHome },
//   {
//     name: 'Stocks',
//     href: `/dashboard/${session?.userId}/stocks`,
//     icon: MdLeaderboard,
//   },
//   { name: 'Orders', href: `/dashboard/${session?.userId}/orders`, icon: HiClipboardList },
// //   { name: 'Mérkőzések', href: '/dashboard/merkozesek', icon: GiWhistle },
// ];

export default function NavLinks({ session }: { session: SessionType | null }) {
  const pathname = usePathname();
  console.log("Navlinks session: ", session)

  const links = [
    { name: 'Overview', href: `/dashboard`, icon: MdHome },
    {
      name: 'Stocks',
      href: `/dashboard/stocks`,
      icon: MdLeaderboard,
    },
    { name: 'Orders', href: `/dashboard/orders`, icon: HiClipboardList },
  //   { name: 'Mérkőzések', href: '/dashboard/merkozesek', icon: GiWhistle },
  ];

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex items-center gap-4 rounded-xl p-2 font-medium  dark:hover:bg-neutral-900 hover:bg-neutral-200 transition-all duration-500',
              {
                'dark:bg-neutral-800 bg-neutral-300  font-bold ': pathname === link.href,
              }
            )}
          >
            <div className="flex items-center pl-1.5">
              <LinkIcon size={20} />
            </div>

            <div className={`flex-grow transition-opacity duration-500`}>
              {link.name}
            </div>
          </Link>
        );
      })}
    </>
  );
}
