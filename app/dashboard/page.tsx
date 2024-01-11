import { getUserWhID } from "@/app/lib/data";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { checkWarehouse } from "@/app/lib/data";

export default async function DashboardPage({ params }: {params: { id: string } }) {
  const session = await auth();
  const id = params.id;

  if (!session || !session.user || !session.user.id) {
    console.log("Nincs bejelentkezett felhasználó, vagy hiányzik a felhasználói ID.");
    return; 
  }

  const isWarehouseExist = await checkWarehouse(session?.user.id);
  
  if (isWarehouseExist == false) {
    redirect(`/dashboard/create-warehouse`);
  }

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}
