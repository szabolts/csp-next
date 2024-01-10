"use client";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Input,
  Checkbox,
  Slider,
  Button,
  Tooltip,
} from "@nextui-org/react";
import { useState } from "react";
import { MdEdit } from "react-icons/md";
import { MdSave } from "react-icons/md";
import { Warehouse } from "@/app/lib/definitions";
import { setOptParams } from "@/app/lib/actions";

export default function OptSettings({ warehouse }: { warehouse: Warehouse }) {
  const [isEnabled, setIsEnabled] = useState(false);
  
  return (
    <Card className="  px-2 pb-2 dark:bg-neutral-900  ">
      <CardHeader className="flex justify-center text-lg p-2">
        <div className="w-[32px]"></div>
        <span className="text-xl flex-1 text-center ">
          Optimization Settings
        </span>
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
              form="optSettings"
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
      <form id="optSettings" action={setOptParams}>
        <CardBody className="flex flex-col justify-center gap-2">
          <Slider
            getValue={(value) => `${value}%`}
            // name="numberOfStocks"
            isDisabled={!isEnabled}
            color="primary"
            size="sm"
            label="Number of used stocks"
            step={1}
            maxValue={100}
            minValue={0}
            defaultValue={warehouse.optSettings.numberOfStocks}
            className="max-w-md"
            onChange={(value) => {
                const hiddenInput = document.getElementById('hiddenNumberOfStocks') as HTMLInputElement;
                if (hiddenInput) {
                  hiddenInput.value = value.toString();
                }
            }}
          />
          <input type="hidden" id="hiddenNumberOfStocks" name="numberOfStocks" />
          <Slider
            getValue={(value) => `${value}%`}
            // name="lengthOfStocks"
            isDisabled={!isEnabled}
            color="primary"
            size="sm"
            label="Length of used stocks"
            step={1}
            maxValue={100}
            minValue={0}
            defaultValue={warehouse.optSettings.lengthOfStocks}
            className="max-w-md"
            onChange={(value) => {
                const hiddenInput = document.getElementById('hiddenLengthOfStocks') as HTMLInputElement;
                if (hiddenInput) {
                  hiddenInput.value = value.toString();
                }
            }}
          />
          <input type="hidden" id="hiddenLengthOfStocks" name="lengthOfStocks" />
          <Slider
            getValue={(value) => `${value}%`}
            name="cuts"
            isDisabled={!isEnabled}
            color="primary"
            size="sm"
            label="Cuts"
            step={1}
            maxValue={100}
            minValue={0}
            defaultValue={warehouse.optSettings.cuts}
            className="max-w-md"
            onChange={(value) => {
                const hiddenInput = document.getElementById('hiddenCuts') as HTMLInputElement;
                if (hiddenInput) {
                  hiddenInput.value = value.toString();
                }
            }}
          />
          <input type="hidden" id="hiddenCuts" name="cuts" />
          <Slider
            getValue={(value) => `${value}%`}
            name="waste"
            isDisabled={!isEnabled}
            color="primary"
            size="sm"
            label="Waste"
            step={1}
            maxValue={100}
            minValue={0}
            defaultValue={warehouse.optSettings.waste}
            className="max-w-md"
            onChange={(value) => {
                const hiddenInput = document.getElementById('hiddenWaste') as HTMLInputElement;
                if (hiddenInput) {
                  hiddenInput.value = value.toString();
                }
            }}
          />
          <input type="hidden" id="hiddenWaste" name="waste" />
        </CardBody>
      </form>
    </Card>
  );
}
