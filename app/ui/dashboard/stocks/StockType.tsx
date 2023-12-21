import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Divider,
    Input,
    Checkbox,
  } from "@nextui-org/react";

export default function StockType() {
    return (
        <Card className=" h-[160px] px-2 pb-2 dark:bg-neutral-900  ">
            <CardHeader className="flex justify-center text-lg">
                Még ide valami?
            </CardHeader>
            <Divider />
            <CardBody>
                Akármi
            </CardBody>
        </Card>
    )
}