"use client";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Input,
  Checkbox,
  Button,
  Tooltip,
} from "@nextui-org/react";
import { useState } from "react";
import { MdEdit } from "react-icons/md";
import { MdSave } from "react-icons/md";
import { Warehouse } from "@/app/lib/definitions";
import { setCutParams } from "@/app/lib/actions";

export default function Stockparams({ warehouse }: { warehouse: Warehouse }) {
  const [isEnabled, setIsEnabled] = useState(false);
  console.log("kerf: " + warehouse.cuttingParams.kerfWidth);
  return (
    <Card className=" px-2 pb-2 h-[281px] dark:bg-neutral-900 ">
      <CardHeader className="flex justify-center  text-lg p-2">
        <div className="w-[32px]"></div>
        <span className="text-xl flex-1 text-center ">Stockparams</span>
        {isEnabled ? (
          <Tooltip
            placement="left-start"
            color="foreground"
            showArrow={true}
            content="Save settings">
            <Button
              type="button"
              size="sm"
              variant="solid"
              isIconOnly
              className=""
              color="primary"
              onClick={() => setIsEnabled(false)}>
              <MdSave size={18} />
            </Button>
          </Tooltip>
        ) : (
          <Tooltip
            placement="left-start"
            color="foreground"
            showArrow={true}
            content="Edit settings">
            <Button
              type="submit"
              form="cutparams"
              size="sm"
              variant="light"
              isIconOnly
              className=""
              onClick={() => setIsEnabled(true)}>
              <MdEdit size={18} />
            </Button>
          </Tooltip>
        )}
      </CardHeader>
      <Divider />
      <form id="cutparams" action={setCutParams} className="h-full ">
        <CardBody className="gap-4 h-full justify-center" >
          <div className="grid grid-cols-2 gap-2 items-center w-full">
            <span className="w-full flex justify-start">Blade thickness</span>
            <Input
              isReadOnly={!isEnabled}
              name="kerfWidth"
              type="number"
              // label="Blade thickness / Kerf"
              // labelPlacement="outside-left"
              min={0}
              defaultValue={warehouse.cuttingParams.kerfWidth.toString()}
              variant="faded"
              placeholder="Enter value"
              className="w-full"
              classNames={{ inputWrapper: "h-2" }}
              endContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">mm</span>
                </div>
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-2 items-center w-full">
            <span className="w-full flex justify-start">Cut Cost</span>
            <Input
              isReadOnly={!isEnabled}
              name="cuttingCost"
              type="number"
              // label="Cut Cost"
              // labelPlacement="outside-left"
              min={0}
              defaultValue={warehouse.cuttingParams.cuttingCost.toString()}
              variant="faded"
              placeholder="Enter value"
              className="w-full"
              classNames={{ inputWrapper: "h-2" }}
              endContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">Ft</span>
                </div>
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-2 items-center w-full">
            <span className="w-full flex justify-start">Waste treshold</span>
            <Input
              isReadOnly={!isEnabled}
              name="wasteTreshold"
              type="number"
              // label="Cut Cost"
              // labelPlacement="outside-left"
              min={0}
              defaultValue={warehouse.cuttingParams.wasteTreshold.toString()}
              variant="faded"
              placeholder="Enter value"
              className="w-full"
              classNames={{ inputWrapper: "h-2" }}
              endContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">mm</span>
                </div>
              }
            />
          </div>
        </CardBody>
      </form>
    </Card>
  );
}
