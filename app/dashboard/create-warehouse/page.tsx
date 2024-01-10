
import Create from "./create";

export default function CreateWarehouse() {

  return (
    <div className="flex flex-col w-full h-[calc(100vh-65px)] mt-24 justify-start items-center">
      <div className="w-auto flex flex-col items-center ">
        <Create />
      </div>
    </div>
  );
}
