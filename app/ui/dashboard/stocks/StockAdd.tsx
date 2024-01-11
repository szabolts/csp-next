"use client";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Input,
  Checkbox,
  Table,
  TableHeader,
  TableRow,
  TableColumn,
  TableCell,
  TableBody,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  RadioGroup,
  Radio
} from "@nextui-org/react";
import { Warehouse } from "@/app/lib/definitions";
import { createStock } from "@/app/lib/actions";
import StockActions from "./StockActions";

export default function StockAdd({ warehouse }: { warehouse: Warehouse }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const stockId = warehouse.stock.map((item) => item.id);
  return (
    <>
    <Card className=" px-2 pb-2  dark:bg-neutral-900 ">
      <CardHeader className="flex justify-center text-lg p-2">
        <div className="w-[32px]"></div>
        <span className="text-xl flex-1 text-center ">Stocks</span>
        <Button size="sm" color="primary" onPress={onOpen}>
          Add New +
        </Button>
      </CardHeader>
      <Table aria-label="Stock table" removeWrapper selectionMode="multiple" >
        <TableHeader>
          <TableColumn className="text-sm">Label</TableColumn>
          <TableColumn className="text-sm">Type</TableColumn>
          <TableColumn className="text-sm">Length</TableColumn>
          <TableColumn className="text-sm">Quantity</TableColumn>
          <TableColumn className="text-sm">Cost</TableColumn>
          <TableColumn className="text-sm">Action</TableColumn>
        </TableHeader>
        <TableBody>
          {warehouse.stock.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="text-sm">{item.name}</TableCell>
              <TableCell className="text-sm">{item.type}</TableCell>
              <TableCell className="text-sm">{item.length}</TableCell>
              <TableCell className="text-sm">{item.quantity}</TableCell>
              <TableCell className="text-sm">{item.cost}</TableCell>
              <TableCell className="text-sm"><StockActions stockId={item.id}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
    <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        className=""
        size="xs"
        backdrop="blur"
        hideCloseButton 
      >
        <ModalContent>
          {(onClose) => (
            <>
              <form action={createStock}>
                <ModalHeader className="flex justify-center ">
                  Stock hozzáadása
                </ModalHeader>
                <ModalBody className="gap-1">
                  <Input
                    name="name"
                    type="text"
                    label="Elnevezés"
                    labelPlacement="outside"
                    description="Stock elnevezése"
                    />
                  <Input
                    name="type"
                    type="text"
                    label="Típus"
                    labelPlacement="outside"
                    description="Stock típusa (ebből select lesz)"
                    />
                  <Input
                    name="length"
                    type="number"
                    min={0}
                    label="Hossz"
                    labelPlacement="outside"
                    description="Stock hossza"
                    />
                  <Input
                    name="quantity"
                    type="number"
                    min={0}
                    label="Darabszám"
                    labelPlacement="outside"
                    description="Stock darabszáma"
                    />
                  <Input
                    name="cost"
                    type="number"
                    min={0}
                    label="Egységár"
                    labelPlacement="outside"
                    description="Stock Egységára"
                    />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onClick={onClose}>
                    Close
                  </Button>
                  <Button color="primary" type="submit" onClick={onClose}>
                    Mentés
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
