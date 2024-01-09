"use client";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Input,
  Checkbox,
} from "@nextui-org/react";
import { useState } from "react";

export default function Stockparams() {
  const [isEnabled, setIsEnabled] = useState(false);
  return (
    <Card className=" px-2 pb-2  dark:bg-neutral-900 ">
      <CardHeader className="flex justify-center text-lg">
        Stockparams
      </CardHeader>
      <Divider />
      <CardBody className="flex-row gap-6">
        <div className="flex">
          <Checkbox
            isSelected={isEnabled}
            onValueChange={setIsEnabled}></Checkbox>
          <div className="flex flex-col gap-2">
            <span className="pl-1">Blade thickness / Kerf</span>
            <Input
              isDisabled={!isEnabled}
              name="kerf"
              type="number"
              // label="Cost"
              // labelPlacement="outside"

              variant="faded"
              placeholder="Thickness of the cut"
              className="max-w-[200px]"
              classNames={{ inputWrapper: "h-2" }}
            />
          </div>
        </div>
        <div className="flex">
          <div className="flex flex-col gap-2">
            <span className="pl-1">Cut Cost</span>
            <Input
              isDisabled={!isEnabled}
              name="cutcost"
              type="number"
              // label="Cost"
              // labelPlacement="outside"
              variant="faded"
              placeholder="Cost of the cut"
              className="max-w-[200px]"
              classNames={{ inputWrapper: "h-2" }}
            />
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
