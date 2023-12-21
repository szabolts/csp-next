"use client";

import React from "react";
import { useState, useEffect } from "react";
import Stockinput from "../stockinput/page";

export default function Stockform() {
  
  const [stockInputs, setStockInputs] = useState([]);
  const [idCounter, setIdCounter] = useState(0);
  const [fadeOutId, setFadeOutId] = useState(null);

  const addStockInput = () => {
    const newId = idCounter + 1;
    setStockInputs((prevStockInputs) => [
      ...prevStockInputs,
      <Stockinput
        key={newId}
        id={newId}
        onRemove={() => removeStockInput(newId)}
      />,
    ]);
    setIdCounter(newId);
  };

  const removeStockInput = (id) => {
    setFadeOutId(id);

    setTimeout(() => {
      setStockInputs((prevStockInputs) =>
        prevStockInputs.filter((input) => input.props.id !== id)
      );

      setFadeOutId(null);
    }, 300);
  };

  return (
    <div className="flex flex-col items-center w-full  ">
      <div
        className="sfc flex flex-col items-center w-9/12 transition-all bg-blur backdrop-blur-[5px] duration-300 ease-in-out rounded-md border-2 border-zinc-700 p-2 pt-6 overflow-hidden"
        style={{ height: `calc(${stockInputs.length} * 70px + 170px)` }}
      >
        <h2 className="flex left-2 text-lg pb-2 text-[34px] ">Stocks</h2>
        <div className=" relative top-0 box-border h-14 overflow-visible w-2/3 flex flex-col-3 justify-center  p-2 rounded-md border-2 border-zinc-500 mt-2 mb-2">
          <div className="flex flex-col-2">
            <label className=" w-[100%] inline-flex relative items-center text-[20px] krf ">
              Knife width :
            </label>
            <input
              className=" w-[100%] relative rounded-md border-2 dark:border-zinc-300 border-zinc-700 dark:bg-zinc-500 bg-zinc-300 hover:border-zinc-1000 p-1"
              type="number"
              step={1}
              name="kerf"
              id="kerf"
            />
          </div>
        </div>
        <div className="relative w-full">
          {stockInputs.map((stockInput, index) => (
            <div
              key={stockInput.props.id}
              className={`w-full flex flex-col-3 transition-all duration-300 ease-in-out ${
                stockInput.props.id === fadeOutId
                  ? "fade-out-button absolute"
                  : "fade-in-button absolute"
              }`}
              style={{ top: `calc(${index} * 70px)` }}
            >
              <div className="flex w-16 h-14 justify-center text-center text-[30px] pt-1  rounded-md border-2 border-zinc-500 m-2">
                {index + 1}
              </div>
              {stockInput}
              <button
                type="button"
                className="bg-[#ae6969] active:bg-red-400 m-2 w-20 h-14 text-white p-2 rounded-md border-2 border-red-300 rmb"
                onClick={stockInput.props.onRemove}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
      <button
        className="relative top-[-20px] dark:bg-zinc-500 bg-zinc-200 active:bg-zinc-400 p-3 rounded-md border-2 dark:border-zinc-200 border-zinc-800 z-10"
        onClick={addStockInput}
      >
        New stock
      </button>
    </div>
  );
}
