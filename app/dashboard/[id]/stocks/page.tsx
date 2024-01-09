import Stockparams from "@/app/ui/dashboard/stocks/Stockparams";
import StockType from "@/app/ui/dashboard/stocks/StockType";
import StockAdd from "@/app/ui/dashboard/stocks/StockAdd";

export default function StocksPage() {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-4 md:col-span-2">
        <Stockparams />
      </div>
      <div className="col-span-4 md:col-span-2">
        <StockType />
      </div>
      <div className="col-span-4 md:col-span-4" >
        <StockAdd />
      </div>
    </div>
  );
}
