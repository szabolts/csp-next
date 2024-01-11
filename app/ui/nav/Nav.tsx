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
import { redirect } from "next/navigation";
import Link from "next/link";
import { Session } from "next-auth";
import { SessionType } from "@/app/lib/definitions";
import LogInOutButton from "./LogInOutButton";
import ThemeSwitcher from "./ThemeSwitcher";
import UserComponent from "./User";

export default function Nav({ session }: { session?: SessionType | null }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand className="cursor-pointer">
          <Link href="/#home">
            {/* <p className="font-bold text-inherit">CSP</p> */}
            <img src="/csplogo2.webp" className="h-12 hover:scale-110"></img>
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
          <Link color="foreground" href={`/dashboard/`}>
            Dashboard
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {/* <NavbarItem className="hidden lg:flex"> */}
        <NavbarItem className="">
          <LogInOutButton session={session} />
          {/* <UserComponent /> */}
        </NavbarItem>
        {!session && (
          <NavbarItem>
            <ThemeSwitcher />
          </NavbarItem>
        )}
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
