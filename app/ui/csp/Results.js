import React from "react";
import { useRef } from "react";
import Loading from "./Loading";

export default function Createresults({ response, inputdata, clicked, wrongdata }) {
  if (clicked == true) {
    return (
      <div className="flex flex-col items-center w-full z-50 mb-5" id="results">
        <div className="sfc relative flex flex-col items-center w-9/12 transition-all bg-blur backdrop-blur-[5px] duration-300 ease-in-out rounded-md border-2 border-zinc-700 p-2 pt-6 overflow-hidden">
          <h2 className="flex left-2 text-lg pb-2 text-[34px] ">
            Calculating...
          </h2>
          <Loading />
        </div>
      </div>
    );
  } else if (response.result == 0 && clicked == false) {
    return (
      <div className="flex flex-col items-center w-full z-50 mb-5" id="results">
        <div className="sfc relative flex flex-col items-center w-9/12 transition-all bg-blur backdrop-blur-[5px] duration-300 ease-in-out rounded-md border-2 border-zinc-700 p-2 pt-6 overflow-hidden">
          <h2 className="flex left-2 text-lg pb-2 text-[38px] text-red-400 ">
            ERROR
          </h2>
          <p className=" relative flex left-2 text-lg h-52 pb-2 text-md text-red-400 ">
            -Timeout
          </p>
        </div>
      </div>
    );
  } else if (
    wrongdata === true &&
    clicked === false

  ) {
    return (
      <div className="flex flex-col items-center w-full z-50 mb-5" id="results">
        <div className="sfc relative flex flex-col items-center w-9/12 transition-all bg-blur backdrop-blur-[5px] duration-300 ease-in-out rounded-md border-2 border-zinc-700 p-2 pt-6 overflow-hidden">
          <h2 className="flex left-2 text-lg pb-2 text-[38px] text-red-400 ">
            ERROR
          </h2>
          <p className=" relative flex flex-col left-2 text-lg pb-2 text-md text-red-400 ">
            -Uncool inputs: <br></br>
            <p className=" relative flex left-8 text-lg pb-2 text-md text-red-400 ">
              - "Stock length" <br></br>- "Demand length" <br></br>- "Demand
              quantity" <br></br>
            </p>
            -fields must have a valid integer value
          </p>
        </div>
      </div>
    );
  } else if (
    response != null &&
    response.result != 0 &&
    inputdata != null &&
    inputdata != 0 &&
    clicked == false
  ) {
    const colors = [
      "#966969",
      "#6E9669",
      "#697B96",
      "#969669",
      "#926996",
      "#699690",
    ];
    const numericInput = inputdata[2].map(Number);
    const maxInput = Math.max(...numericInput);
    let e = 0;
    let usedLength = 0;
    let trash = 0;
    let patternCuts = -1;
    let totaldemandpieces = 0;
    let totaldemandlength = 0;
    let totalcutpieces = 0;
    let totalcutlength = 0;
    let differentstocks = 0;
    let totalWaste = 0;

    const numericInput2 = response.result[0].map(Number);
    const totalUsedStocks = numericInput2.reduce(
      (sum, value) => sum + value,
      0
    );

    return (
      <div className="flex flex-col items-center w-full mb-5" id="results">
        <div className="sfc relative flex flex-col items-center w-9/12 transition-all bg-blur backdrop-blur-[5px] duration-300 ease-in-out rounded-md border-2 border-zinc-700 p-2 pt-6 overflow-hidden">
          <h2 className="flex left-2 text-lg pb-2 text-[34px] ">Results</h2>

          <div className=" relative fade-in-button overflow-x-hidden w-[95%] flex flex-col float-left items-left transition-all duration-300 ease-in-out justify-center bg-zinc-200 dark:bg-zinc-800 text-black dark:text-white p-2 pl-4 pr-4 rounded-md border-2 border-zinc-500 mt-2 h-auto">
            <h2 className="flex left-2 text-lg pb-2 text-[34px] ">Staistics</h2>
            <div className="w-full h-[3px] bg-zinc-700"></div>
            <br></br>
            {inputdata[0].map((value, index) => {
              totaldemandpieces += parseInt(inputdata[1][index]);
              totaldemandlength += parseInt(
                inputdata[1][index] * inputdata[0][index]
              );
            })}
            {response.result[0].map((value, index) => {
              if (response.result[0][index] !== 0) {
                totalcutlength +=
                  response.result[0][index] * response.result[1][index][1];
                response.result[1][index][0].forEach((value, inx) => {
                  totalcutpieces +=
                    response.result[0][index] *
                    response.result[1][index][0][inx];
                });
              }
            })}

            <div className="flex flex-col-2 pb-4 responzivecol22">
              <div className="flex w-1/2 responzivecol text-[72px] font-extrabold justify-center text-center items-center">
                {parseFloat((totaldemandlength / totalcutlength) * 100).toFixed(
                  2
                )}
                %
              </div>
              <div className="flex flex-col w-3/4 responzivecol transition-all duration-150 ease-in-out">
                <div className="w-full p-2 pt-0 pb-0">
                  <div className=" relative w-full flex felx-col-2">
                    <div className=" relative w-full flex text-[20px]">
                      Total used stocks :
                    </div>
                    <div className=" relative flex text-[20px] font-extrabold">
                      {totalUsedStocks}{" "}
                      <span className=" text-zinc-700 dark:text-zinc-300 font-normal">pcs</span>
                    </div>
                  </div>
                  <div className="w-full h-[3px] bg-zinc-700"></div>
                  <div className=" relative w-full flex felx-col-2 "></div>
                </div>

                {numericInput.map((valu, index) => {
                  {
                    response.result[0].forEach((value, inx) => {
                      if (response.result[0][inx] !== 0) {
                        if (
                          parseFloat(response.result[1][inx][1]) ==
                          parseFloat(inputdata[2][index])
                        ) {
                          differentstocks += response.result[0][inx];
                        }
                      }
                    });
                  }
                  return (
                    <div key={index} className=" w-full p-2 pt-0 pb-0">
                      <br></br>
                      <div className=" relative w-full flex felx-col-2">
                        <div className=" relative left-1/2 w-full h-1 flex">
                          Stock {numericInput[index]} :
                        </div>
                        <div className=" relative flex font-extrabold">
                          {differentstocks}{" "}
                          <span className=" text-zinc-700 dark:text-zinc-300 font-normal">pcs</span>
                        </div>
                      </div>
                      <div className=" relative left-1/2 w-1/2 h-[2px] bg-zinc-700"></div>
                      <div className=" relative w-full flex felx-col-2 "></div>
                      <div className=" fixed text-transparent">
                        {differentstocks !== 0 && (differentstocks = 0)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="w-full h-[3px] bg-zinc-700 mt-4 mb-2"></div>

            <div className="flex flex-col-2 responzivecol22">
              <div className="w-1/2 p-2 responzivecol">
                <div className=" relative w-full flex felx-col-2">
                  <div className=" relative w-3/4 flex">
                    Total pieces demanded :
                  </div>
                  <div className=" relative flex w-1/4 font-extrabold">
                    {totaldemandpieces}{" "}
                    <span className=" text-zinc-700 dark:text-zinc-300 font-normal">pcs</span>
                  </div>
                </div>
                <div className="w-full h-[2px] bg-zinc-700"></div>
                <div className=" relative w-full flex felx-col-2 ">
                  <div className=" relative w-3/4 flex">
                    Total length demanded :
                  </div>
                  <div className=" relative flex font-extrabold">
                    {totaldemandlength}{" "}
                    <span className=" text-zinc-700 dark:text-zinc-300 font-normal"> mm</span>
                  </div>
                </div>
                <div className="w-full h-[2px] bg-zinc-700"></div>
                <div className=" relative w-full flex felx-col-2 ">
                  <div className=" relative w-3/4 flex">Total cuts :</div>
                  <div className=" relative flex font-extrabold">
                    {response.result[2]}
                  </div>
                </div>
              </div>

              <div className="w-1/2 p-2 responzivecol">
                <div className=" relative w-full flex felx-col-2">
                  <div className=" relative w-3/4 flex">Total pieces cut :</div>
                  <div className=" relative flex w-1/4 font-extrabold">
                    {totalcutpieces}{" "}
                    <span className=" text-zinc-700 dark:text-zinc-300 font-normal"> pcs</span>
                  </div>
                </div>
                <div className="w-full h-[2px] bg-zinc-700"></div>
                <div className=" relative w-full flex felx-col-2 ">
                  <div className=" relative w-3/4 flex">
                    Total length used :
                  </div>
                  <div className=" relative flex font-extrabold">
                    {totalcutlength}{" "}
                    <span className=" text-zinc-700 dark:text-zinc-300 font-normal">mm</span>
                  </div>
                </div>
                <div className="w-full h-[2px] bg-zinc-700"></div>
                <div className=" relative w-full flex felx-col-2 ">
                  <div className=" relative w-3/4 flex">Total waste :</div>
                  <div className=" relative flex font-extrabold">
                    {(totalWaste = totalcutlength - totaldemandlength)}
                    <span className=" text-zinc-700 dark:text-zinc-300 font-normal">mm</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {response.result[0].map((value, index) => {
            if (value != 0) {
              e = e + 1;
              response.result[1][index][0].forEach((item, iInx) => {
                if (item !== 0) {
                  usedLength += item * inputdata[0][iInx];
                  patternCuts += item;
                }
              });
              if (response.result[1][index][2] < 1) {
                patternCuts += 1;
              }

              return (
                <div
                  key={index}
                  className=" relative fade-in-button overflow-x-hidden w-[95%] flex flex-col float-left items-left transition-all duration-300 ease-in-out justify-center bg-zinc-200 dark:bg-zinc-800 text-black dark:text-white p-4 pl-4 pr-4 rounded-md border-2 border-zinc-500 mt-2 "
                >
                  <h2 className="flex left-2 text-lg text-[32px] mb-2">
                    Pattern {e}
                  </h2>
                  <div className="w-full h-[3px] bg-zinc-700 mt-4 mb-2"></div>
                  <div className=" absolute right-4 top-0 fade-in-button font-extrabold overflow-x-hidden w-auto h-10 flex transition-all duration-300 ease-in-out justify-center text-black dark:text-white p-2 rounded-md border-2 border-zinc-500 mt-4 mb-2">
                    {response.result[0][index]}
                    <span className=" text-zinc-700 dark:text-zinc-300 font-normal">
                      x stock:
                    </span>{" "}
                    {response.result[1][index][1]}{" "}
                    <span className=" text-zinc-700 dark:text-zinc-300 font-normal">mm</span>
                  </div>
                  <div className=" mintacont relative w-1/2 flex flex-col mt-4">
                    <div className=" relative w-full flex felx-col-2">
                      <div className=" relative w-3/4 flex">Yield :</div>
                      <div className=" relative flex w-1/4 font-extrabold">
                        {parseFloat(response.result[1][index][2] * 100).toFixed(
                          2
                        )}{" "}
                        <span className=" text-zinc-700 dark:text-zinc-300 font-normal">%</span>
                      </div>
                    </div>
                    <div className="w-[90%] h-[2px] bg-zinc-700"></div>

                    <div className=" relative w-full flex felx-col-2">
                      <div className=" relative w-3/4 flex">Used length :</div>
                      <div className=" relative flex w-1/4 font-extrabold ">
                        {(usedLength += patternCuts * inputdata[4])}{" "}
                        <span className=" text-zinc-700 dark:text-zinc-300 font-normal">mm</span>
                      </div>
                    </div>
                    <div className="w-[90%] h-[2px] bg-zinc-700"></div>

                    <div className=" relative w-full flex felx-col-2">
                      <div className=" relative w-3/4 flex">Trash :</div>
                      <div className=" relative flex w-1/4 font-extrabold">
                        {(trash = response.result[1][index][1] - usedLength)}{" "}
                        <span className=" text-zinc-700 dark:text-zinc-300 font-normal">mm</span>
                      </div>
                    </div>
                    <div className="w-[90%] h-[2px] bg-zinc-700"></div>

                    <div className=" relative w-full flex felx-col-2">
                      <div className=" relative w-3/4 flex">Cuts :</div>
                      <div className=" relative flex w-1/4 font-extrabold">
                        {patternCuts}
                      </div>
                    </div>
                  </div>
                  <div
                    className={` part relative fade-in-button overflow-x-visible h-14 flex transition-all duration-300 ease-in-out justify-start bg-zinc-600 text-balck dark:text-white rounded-md border-2 border-zinc-500 mt-2 mb-2`}
                    style={{
                      width: `calc(${
                        response.result[1][index][1] / maxInput
                      } * 100%)`,
                    }}
                  >
                    {response.result[1][index][0].map((item, itemIndex) => {
                      if (item !== 0) {
                        return Array.from({ length: item }).map(
                          (_, repeatIndex) => (
                            <div
                              key={repeatIndex}
                              className={` relative flex items-center text-center justify-center overflow-visible font-extrabold bg-zinc-900 text-white  border-2 border-zinc-00 rounded-md h-13`}
                              style={{
                                width: `calc(${
                                  inputdata[0][itemIndex] /
                                  response.result[1][index][1]
                                } * 100%)`,
                                background: `${colors[itemIndex]}`,
                              }}
                            >
                              <p className="labell transition-all duration-150 ease-in-out">
                                {inputdata[0][itemIndex]}
                                <span className=" text-zinc-700 dark:text-zinc-300 font-normal">
                                  mm
                                </span>
                              </p>
                            </div>
                          )
                        );
                      }
                      return null; // Return null for items that are 0
                    })}
                  </div>
                  <div className=" fixed text-transparent">
                    {usedLength !== 0 && (usedLength = 0)}
                    {usedLength !== 0 && (usedLength = 0)}
                    {patternCuts !== -1 && (patternCuts = -1)}
                  </div>
                </div>
              );
            } else {
              return null;
            }
          })}
          <br></br>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
