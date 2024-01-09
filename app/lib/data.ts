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
          console.error('Error in fetching user warehouses:', error);
          throw error;
        }
}