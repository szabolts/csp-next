import { logOut } from "@/app/lib/actions";
import { Button } from "@nextui-org/react";


export default async function LogoutButton() {
    
    return  (
      <form
        action={logOut}
      >
        <Button type="submit" color="danger" >
          Sign out
        </Button>
      </form>
      
    );
  }
