"use client";

import { Input, Button } from "@nextui-org/react";
import { createWarehouse } from "@/app/lib/actions";
import { useFormState } from "react-dom";

export default function Create() {
    const initialState = { message: "", errors: {} };
    const [state, dispatch] = useFormState(createWarehouse, initialState);
  return (
    <form action={dispatch} className="flex flex-col items-center gap-4">
      <p className="text-xl"> Add meg a Warehouse nevét</p>
      <Input
        isRequired
        name="name"
        radius="full"
        size="sm"
        type="text"
        placeholder="Optikutter"
        variant="faded"
      />
      <div id="name-error" aria-live="polite" aria-atomic="true">
        {state.errors?.name &&
          state.errors.name.map((error: string) => (
            <p className=" text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
      <Button radius="full" color="primary" type="submit">
        Create
      </Button>
    </form>
  );
}

