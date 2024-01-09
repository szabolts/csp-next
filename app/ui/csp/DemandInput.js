"use client";

import React from "react";

export default function Demandinput({ id }) {
  return (
    <div className="fade-in-button overflow-x-hidden w-[95%] h-14 flex flex-col-4 transition-all duration-300 ease-in-out justify-center  p-2 rounded-md border-2 border-zinc-500 mt-2 mb-2 responzivecol22 ih">
      <div className="flex flex-col-2 w-full">
        <label className="w-full min-w-[130px] inline-flex relative ml-2 items-center max-text-[20px]">
          Demand length :
        </label>
        <input
          className="w-full relative  mr-2 rounded-md border-2 dark:border-zinc-300 border-zinc-700 dark:bg-zinc-500 bg-zinc-300 pl-1"
          type="number"
          step={1}
          id={"demandLength" + id}
        />
      </div>

      <div className="flex flex-col-2 w-full">
        <label className="w-full min-w-[130px] inline-flex relative ml-2 items-center max-text-[20px]">
          Demand quantity :
        </label>
        <input
          className="w-full relative mr-2 rounded-md border-2 dark:border-zinc-300 border-zinc-700 dark:bg-zinc-500 bg-zinc-300 pl-1"
          type="number"
          step={1}
          id={"demandQuantity" + id}
        />
      </div>
    </div>
  );
}
