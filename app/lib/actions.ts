"use server";

import { signIn, signOut, auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { z } from "zod";
import * as bcrypt from "bcrypt";
import prisma from "@/utils/prisma";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function logOut() {
  await signOut();
}

const UserSchema = z
  .object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    password2: z.string().min(6),
  })
  .refine((data) => data.password === data.password2, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

export async function createUser(formData: FormData) {
  const { name, email, password, password2 } = UserSchema.parse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    password2: formData.get("password2"),
  });

  console.log(password);
  const bPassword = await bcrypt.hash(password, 10);
  console.log(bPassword);

  try {
    await prisma.user.create({
      data: {
        email: email,
        password: bPassword,
        name: name,
      },
    });
    console.log("Succesfully created user");
    return { success: true };

    // redirect('/dashboard');
  } catch (error) {
    console.error(error);
    return { success: false, message: "Hiba történt a regisztráció során." };
  }
}

const CreateWhSchema = z.object({
  name: z.string().min(3, {
    message: "A raktár nevének legalább 3 karakternek kell lennie.",
  }),
});

export type State = {
  errors?: {
    name?: string[];
  };
  message?: string | null;
};

export async function createWarehouse(prevState: State, formData: FormData) {
  const session = await auth();
  const validatedFields = CreateWhSchema.safeParse({
    name: formData.get("name"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Sikertelen létrehozás, töltsd ki az összes mezőt!",
    };
  }

  const name = validatedFields.data.name;

  try {
    const newWarehouse = await prisma.warehouse.create({
      data: {
        name: name,
        cuttingParams: {
          cuttingCost: 0,
          kerfWidth: 0,
          wasteTreshold: 0,
        },
        optSettings: {
          numberOfStocks: 100,
          lengthOfStocks: 90,
          cuts: 80,
          waste: 70,
        },
      },
    });

    if (session?.user?.id) {
      await prisma.user.update({
        where: { id: session.user.id },
        data: { warehouseId: newWarehouse.id },
      });
    }
  } catch (error) {
    return {
      message: "Database error: Failed to create Warehouse.",
    };
  }
  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath(`/dashboard`);
  redirect(`/dashboard`);
}

export async function setCutParams(formdata: FormData) {
  const session = await auth();
  const cuttingCost = formdata.get("cuttingCost");
  const kerfWidth = formdata.get("kerfWidth");
  const wasteTreshold = formdata.get("wasteTreshold");

  if (cuttingCost === null || kerfWidth === null || wasteTreshold === null) {
    throw new Error("One or more form fields are empty");
  }

  const cuttingParams = {
    cuttingCost: Number(cuttingCost),
    kerfWidth: Number(kerfWidth),
    wasteTreshold: Number(wasteTreshold),
  };

  console.log("foshugy", cuttingParams);

  try {
    const user = await prisma.user.findUnique({
      where: { id: session?.user?.id },
    });

    if (!user || !user.warehouseId) {
      throw new Error("No warehouse assigned to this user.");
    }

    await prisma.warehouse.update({
      where: { id: user?.warehouseId },
      data: {
        cuttingParams: {
          update: cuttingParams,
        },
      },
    });
  } catch (error) {
    console.error("Error in updating cutting params:", error);
    throw error;
  }

  revalidatePath(`/dashboard/stocks`);
  redirect(`/dashboard/stocks`);
}

export async function setOptParams(formdata: FormData) {
  const session = await auth();
  console.log("--------FormData: ", formdata);
  const numberOfStocks = formdata.get("numberOfStocks");
  const lengthOfStocks = formdata.get("lengthOfStocks");
  const cuts = formdata.get("cuts");
  const waste = formdata.get("waste");

  // if (cuttingCost === null || kerfWidth === null || wasteTreshold === null) {
  //   throw new Error('One or more form fields are empty');
  // }

  const optSettings = {
    numberOfStocks: Number(numberOfStocks),
    lengthOfStocks: Number(lengthOfStocks),
    cuts: Number(cuts),
    waste: Number(waste),
  };

  console.log("--------Optsettings: ", optSettings);

  try {
    const user = await prisma.user.findUnique({
      where: { id: session?.user?.id },
    });

    if (!user || !user.warehouseId) {
      throw new Error("No warehouse assigned to this user.");
    }

    await prisma.warehouse.update({
      where: { id: user?.warehouseId },
      data: {
        optSettings: {
          update: optSettings,
        },
      },
    });
  } catch (error) {
    console.error("Error in updating cutting params:", error);
    throw error;
  }

  revalidatePath(`/dashboard/stocks`);
  redirect(`/dashboard/stocks`);
}

export async function createStock(formData: FormData) {
  const session = await auth();
  const name = formData.get("name");
  const type = formData.get("type");
  const length = formData.get("length");
  const quantity = formData.get("quantity");
  const cost = formData.get("cost");

  if (
    name === null ||
    type === null ||
    length === null ||
    quantity === null ||
    cost === null
  ) {
    throw new Error("One or more form fields are empty");
  }

  const stock = {
    name: String(name),
    type: String(type),
    length: Number(length),
    quantity: Number(quantity),
    cost: Number(cost),
  };

  try {
    const user = await prisma.user.findUnique({
      where: { id: session?.user?.id },
    });

    if (!user || !user.warehouseId) {
      throw new Error("No warehouse assigned to this user.");
    }

    await prisma.stock.create({
      data: {
        ...stock,
        warehouseId: user.warehouseId,
      },
    });
  } catch (error) {
    console.error("Error in fetching warehouse:", error);
    throw error;
  }

  revalidatePath(`/dashboard/stocks`);
  redirect(`/dashboard/stocks`);
}

export async function updateStock(stockId: string, formData: FormData) {
  const name = formData.get("name");
  const type = formData.get("type");
  const length = formData.get("length");
  const quantity = formData.get("quantity");
  const cost = formData.get("cost");

  if (
    name === null ||
    type === null ||
    length === null ||
    quantity === null ||
    cost === null
  ) {
    throw new Error("One or more form fields are empty");
  }

  const stockUpdate = {
    name: String(name),
    type: String(type),
    length: Number(length),
    quantity: Number(quantity),
    cost: Number(cost),
  };


  try {
    const stock = await prisma.stock.findUnique({
      where: { id: stockId },
    });

    if (!stock) {
      throw new Error("Stock not found.");
    }

    await prisma.stock.update({
      where: { id: stockId },
      data: stockUpdate,
    });

  } catch (error) {
    console.error("Error in fetching warehouse:", error);
    throw error;
  }
  revalidatePath(`/dashboard/stocks`);
  redirect(`/dashboard/stocks`);
}

export async function deleteStock(stockId: string) {
  try {
    await prisma.stock.delete({
      where: { id: stockId },
    });
  } catch (error) {
    console.error("Error in deleting stock:", error);
    throw error;
  }
  revalidatePath(`/dashboard/stocks`);
  redirect(`/dashboard/stocks`);
}