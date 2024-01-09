import Link from "next/link"
import clsx from 'clsx';
import NavLinks from "./NavLinks";
import { auth } from "@/auth";

export default async function Sidenav() {
    const session = await auth();
    return (
        <div className=" p-4 pt-6 w-full h-[calc(100vh-65px)] border-r-[1px] border-divider">
            <div className="flex-col-1 justity-center w-full">
                <NavLinks session={session}/>
                <div className="border-t-1 border-divider mt-4" ></div>
            </div>
        </div>
    )
}