import { Button } from "@nextui-org/react"
import { MdEdit } from "react-icons/md";

export default function Editbutton() {
    return (
        <Button size="sm" variant="light"  isIconOnly className=""><MdEdit size={18}/></Button>
    )
}