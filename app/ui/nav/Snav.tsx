import {auth} from "@/auth";
import Nav from "./Nav";

export default async function ServerNav() {
const session = await auth();
// console.log("session in RSC: ",session);
 return (
    <Nav session={session}/>
 )

}