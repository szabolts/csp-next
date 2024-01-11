import prisma from "@/utils/prisma";
import { auth } from "@/auth"

export async function getUserWhID(userId: string): Promise<string | null> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        warehouse: {
          select: {
            id: true,
          },
        },
      },
    });
    if (user && user.warehouse) {
      console.log("Warehouse ID: ", user.warehouse.id);
      return user.warehouse.id;
    } else {
      console.log("User or User's Warehouse not found");
      return null;
    }
  } catch (error) {
    console.error("Error in fetching user warehouses:", error);
    throw error;
  }
}

export async function fetchWarehouse(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || !user.warehouseId) {
      throw new Error('No warehouse assigned to this user.');
    }

    const warehouse = await prisma.warehouse.findUnique({
      where: { id: user.warehouseId },
      include: {
        stock: true,
        waste: true,
      },
    });

    if (!warehouse) {
      throw new Error('Warehouse not found.');
    }
    return warehouse;    

  } catch (error) {
    console.error("Error in fetching warehouse:", error);
    throw error;
  }
}

export async function checkWarehouse(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    
    });
    if (user && user.warehouseId) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error in checking warehouse:", error);
    throw error;
  }
}

export async function fetchStockData(stockId: string) {
  try {
    const stock = await prisma.stock.findUnique({
      where: { id: stockId },
    
    });
    if (stock) {
      return stock;
    } else {
      return null;
    }

  } catch (error) {
    console.error("Error in fetching stock data:", error);
    throw error;
  }
}


// export async function fetchStock() {
//   const session = await auth();

//   try {
//     const user = await prisma.user.findUnique({
//       where: { id: session?.user?.id },
//     });

//     if (!user || !user.warehouseId) {
//       throw new Error('No warehouse assigned to this user.');
//     }

//     const warehouse = await fetchWarehouse(userId);
//     return warehouse.stock;
//   } catch (error) {
//     console.error("Error in fetching stock:", error);
//     throw error;
//   }
// }
