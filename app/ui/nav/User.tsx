import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, Divider} from "@nextui-org/react";
import { Session } from "next-auth";
import LogoutButton from "./LogoutButton";
import ThemeSwitcher from "./ThemeSwitcher";

export default function UserComponent({ session }: { session?: Session | null }) {

    return(
        <Dropdown placement="bottom-end" backdrop="blur">
          <div className="flex flex-row gap-4 items-center" >
            <p>{session?.user?.name}</p>

        <DropdownTrigger className="flex flex-col-2 " >
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            // src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          />
        </DropdownTrigger>
          </div>
        <DropdownMenu aria-label="Profile Actions" variant="flat" bottomContent={<div className="pl-2 pb-1 flex flex-col gap-2"><ThemeSwitcher /> <LogoutButton/></div>}>
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">{session?.user?.email}</p>
          </DropdownItem>
          <DropdownItem key="settings">Settings</DropdownItem>
          <DropdownItem key="help_and_feedback">
            Help & Feedback
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    )
}