import { getUserWhID } from "@/app/lib/data";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function DashboardPage({ params }: {params: { id: string } }) {
  // const session = await auth();
  const id = params.id;
  const whIDs = await getUserWhID(id);
  console.log("whIDs: ", whIDs)
  if (whIDs == null) {
    redirect(`/dashboard/create-warehouse`);
  }

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}
