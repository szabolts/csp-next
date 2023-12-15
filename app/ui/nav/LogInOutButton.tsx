import LogoutButton from "./LogoutButton";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { Session } from "next-auth";

export default function LogInOutButton ({ session }: { session?: Session | null }) {
    
    return session ? (
        <LogoutButton/>
    ): (
        <div>
            <Button><Link href="/signup">Signup</Link></Button>
            <Link href="/login" className="pl-2">Login</Link>
        </div>
    );
}