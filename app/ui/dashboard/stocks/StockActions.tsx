import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function StockActions({stockId} : {stockId: string}) {
  return (
    <Dropdown showArrow
    className="min-w-0"
    >
      <DropdownTrigger>
        <Button isIconOnly radius="full" size="sm" variant="light">
          <BsThreeDotsVertical className="text-default-400" size={18} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu  
        disabledKeys={["view"]}  
      >
        <DropdownItem key="view" isReadOnly>View</DropdownItem>
        <DropdownItem key="edit" href={`/dashboard/stocks/${stockId}/edit`} >Edit</DropdownItem>
        <DropdownItem key="delete" className="text-danger" color="danger" >Delete</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
