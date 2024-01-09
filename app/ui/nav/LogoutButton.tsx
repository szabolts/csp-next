import { logOut } from "@/app/lib/actions";
import { Button } from "@nextui-org/react";


export default function LogoutButton() {
    
    return  (
      <form
        action={logOut}
      >
        <Button type="submit" color="danger" size="sm">
          Sign out
        </Button>
      </form>
      
    );
  }
