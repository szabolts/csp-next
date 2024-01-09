"use client";

import React from "react";
import { useState } from "react";
import Demandinput from "./DemandInput";

export default function Demandform() {
  const colors = [
    "#966969",
    "#6E9669",
    "#697B96",
    "#969669",
    "#926996",
    "#699690",
  ];
  const [demandInputs, setDemandInputs] = useState([]);
  const [didCounter, setDIdCounter] = useState(0);
  const [fadeOutId, setFadeOutId] = useState(null);

  const addDemandInput = () => {
    const newDId = didCounter + 1;
    setDemandInputs((prevDemandInputs) => [
      ...prevDemandInputs,
      <Demandinput
        key={newDId}
        id={newDId}
        onRemove={() => removeDemandInput(newDId)}
      />,
    ]);
    setDIdCounter(newDId);
  };

  const removeDemandInput = (id) => {
    setFadeOutId(id);

    setTimeout(() => {
      setDemandInputs((prevDemandInputs) =>
        prevDemandInputs.filter((input) => input.props.id !== id)
      );

      setFadeOutId(null);
    }, 300);
  };
  return (
    <div className="flex flex-col items-center w-full ">
      <div
        className="sfc flex flex-col items-center w-[90%] transition-all bg-blur backdrop-blur-[5px] duration-300 ease-in-out rounded-md border-2 border-zinc-700 p-2 pt-6 overflow-hidden"
        style={{ height: `calc(${demandInputs.length} * 70px + 100px)` }}
      >
        <h2 className="flex left-2 text-lg pb-2 text-[34px]">Demands</h2>
        <div className="relative w-full">
          {demandInputs.map((demandInput, index) => (
            <div
              key={demandInput.props.id}
              className={`w-full flex flex-col-3 transition-all duration-300 ease-in-out ${
                demandInput.props.id === fadeOutId
                  ? "fade-out-button absolute"
                  : "fade-in-button absolute"
              }`}
              style={{ top: `calc(${index} * 70px)` }}
            >
              <div className=" w-16 h-14 justify-center text-center bg-zinc-800 text-white text-[30px] pt-1 rounded-md border-2 border-zinc-500 m-2"
              style={{ background: `${colors[index]}` }}>
                {index + 1}
              </div>
              {demandInput}
              <button
                type="button"
                className="bg-[#ae6969] active:bg-red-400 m-2 w-20 h-14 text-white p-2 rounded-md border-2 border-red-300 rmb"
                onClick={demandInput.props.onRemove}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
      <button
        className="relative top-[-20px] dark:bg-zinc-500 bg-zinc-200 active:bg-zinc-400 p-3 rounded-md border-2 dark:border-zinc-200 border-zinc-800 z-10"
        onClick={addDemandInput}
      >
        New demand
      </button>
    </div>
  );
}
