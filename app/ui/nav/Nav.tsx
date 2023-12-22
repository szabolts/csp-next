"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import { useState } from "react";
import Link from "next/link";
import { Session } from "next-auth";
import LogInOutButton from "./LogInOutButton";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Nav({ session }: { session?: Session | null }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHovered, setHovered] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      isBordered
      classNames={{ wrapper: "max-w-screen-xl" }}
    >
      <NavbarContent>
        {/* <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        /> */}
        <NavbarBrand className="cursor-pointer">
          <Link href="/#home">
            {/* <p className="font-bold text-inherit">CSP</p> */}
            <div className="relative h-[62px] w-[62px] flex bg-gradient-to-tr from-transparent dark:via-purple-600 via-red-900 transition-all duration-400 ease-in-out rounded-lg justify-center items-center">
              
              <img
                src="/csplogo3.webp"
                className={`relative w-[56px] p-[3px] h-[56px] hover:scale-110 transition-all duration-300 ease-in-out z-20 invert dark:invert-0 `}
              ></img>
            </div>
           
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4 " justify="center">
        <NavbarItem>
          <Link color="foreground" href="/#features">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/#pricing">
            Pricing
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/#contactus">
            Contact Us
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/csp">
            Csp
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/dashboard">
            Dashboard
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {/* <NavbarItem className="hidden lg:flex"> */}
        <NavbarItem className="">
          <LogInOutButton session={session} />
        </NavbarItem>
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        <NavbarMenuItem>
          <Link href="/" onClick={closeMenu}>
            Home
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link href="/#features">Features</Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link href="/#pricing">Pricing</Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link href="/#contactus">Contact Us</Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link href="/csp">Csp</Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
