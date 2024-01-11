import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Input,
  Button,
} from "@nextui-org/react";
import { fetchStockData } from "@/app/lib/data";
import { updateStock } from "@/app/lib/actions";
import { auth } from "@/auth";
import { Warehouse } from "@/app/lib/definitions";
import { div } from "three/examples/jsm/nodes/Nodes.js";
import Link from "next/link";
// import { useRouter } from "next/navigation";

export default async function StockEdit({
  params,
}: {
  params: { id: string };
}) {
  const stockId = params.id;
  const stock = await fetchStockData(stockId);
  const updateStockWithId = updateStock.bind(null, stockId)
  //   const router = useRouter();
  return (
    <div className="flex justify-center items-center">
      <Card className="px-2 pb-2 w-1/2 dark:bg-neutral-900">
        <CardHeader className="flex justify-center text-lg p-2">
          Edit Stock
        </CardHeader>
        <Divider />
        <form id="stockedit" action={updateStockWithId}>
          <CardBody className="gap-4">
            <div className="grid grid-cols-2 gap-2 items-center w-full">
              <span className="w-full flex justify-start">Elnevezés</span>
              <Input
                name="name"
                type="text"
                defaultValue={stock?.name}
                classNames={{ inputWrapper: "h-2" }}
              />
            </div>
            <div className="grid grid-cols-2 gap-2 items-center w-full">
              <span className="w-full flex justify-start">Típus</span>
              <Input
                name="type"
                type="text"
                defaultValue={stock?.type}
                classNames={{ inputWrapper: "h-2" }}
              />
            </div>
            <div className="grid grid-cols-2 gap-2 items-center w-full">
              <span className="w-full flex justify-start">Hossz</span>
              <Input
                name="length"
                type="number"
                defaultValue={stock?.length.toString()}
                classNames={{ inputWrapper: "h-2" }}
              />
            </div>
            <div className="grid grid-cols-2 gap-2 items-center w-full">
              <span className="w-full flex justify-start">Darabszám</span>
              <Input
                name="quantity"
                type="number"
                defaultValue={stock?.quantity.toString()}
                classNames={{ inputWrapper: "h-2" }}
              />
            </div>
            <div className="grid grid-cols-2 gap-2 items-center w-full">
              <span className="w-full flex justify-start">Egységár</span>
              <Input
                name="cost"
                type="number"
                defaultValue={stock?.cost.toString()}
                classNames={{ inputWrapper: "h-2" }}
              />
            </div>
          </CardBody>
        </form>
        {/* <Divider /> */}
        <CardFooter className="flex justify-center gap-2">
          <Link href={"/dashboard/stocks"}>
            <Button type="button" color="default">
              Vissza
            </Button>
          </Link>
          <Button type="submit" color="primary" form="stockedit">
            Save
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
