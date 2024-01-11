import Stockparams from "@/app/ui/dashboard/stocks/Stockparams";
import OptSettings from "@/app/ui/dashboard/stocks/OptSettings";
import StockAdd from "@/app/ui/dashboard/stocks/StockAdd";
import { fetchWarehouse } from "@/app/lib/data";
import { auth } from "@/auth";
// import { SessionType } from "@/app/lib/definitions";
// import { Warehouse } from "@/app/lib/definitions";

export default async function StocksPage() {
  const session = await auth();
  console.log(session);

  if (!session || !session.user || !session.user.id) {
    console.log("Nincs bejelentkezett felhasználó, vagy hiányzik a felhasználói ID.");
    return; 
  }
  
  const warehouse = await fetchWarehouse(session.user.id);
  console.log(warehouse);
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-4 md:col-span-2">
        <Stockparams warehouse={warehouse} />
      </div>
      <div className="col-span-4 md:col-span-2">
        <OptSettings warehouse={warehouse}/>
      </div>
      <div className="col-span-4 md:col-span-4" >
        <StockAdd warehouse={warehouse} />
      </div>
    </div>
  );
}
