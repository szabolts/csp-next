import LogoutButton from "./LogoutButton";
import Link from "next/link";
import { Button, User } from "@nextui-org/react";
import { Session } from "next-auth";
import { SessionType } from "@/app/lib/definitions";
import UserComponent from "./User";

export default function LogInOutButton ({ session }: { session?: SessionType | null }) {
    
    return session ? (
        // <LogoutButton/>
        <UserComponent session={session}/>
    ): (
        <div>
            <Button><Link href="/signup">Signup</Link></Button>
            <Link href="/login" className="pl-2">Login</Link>
        </div>
    );
}