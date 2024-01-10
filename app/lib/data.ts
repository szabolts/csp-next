import prisma from "@/utils/prisma";

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
