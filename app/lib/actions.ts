"use server";

import { signIn, signOut, auth } from "@/auth";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
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
  name: z.string().min(3, { message: "A raktár nevének legalább 3 karakternek kell lennie."}),
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
      },
    });

    if (session?.user?.id) {
      await prisma.user.update({
        where: { id: session.user.id },
        data: { warehouseId: newWarehouse.id },
      })
    }
  } catch (error) {
    return {
      message: "Database error: Failed to create Warehouse.",
    };
  }
  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath(`/dashboard/${session?.user?.id}`);
  redirect(`/dashboard/${session?.user?.id}`);
}

