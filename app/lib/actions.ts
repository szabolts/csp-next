'use server'

import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import { z } from 'zod'; 
import * as bcrypt from "bcrypt";
import prisma from "@/utils/prisma";

 
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function logOut() {
    await signOut();
}

const UserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    password2: z.string().min(6)
  })
  .refine((data) => data.password === data.password2, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

  export async function createUser ( formData: FormData) {
    const { name, email, password, password2 } = UserSchema.parse({
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      password2: formData.get('password2')
    })
    
    console.log(password)
    const bPassword = await bcrypt.hash(password, 10)
    console.log(bPassword)
  
    try {
         await prisma.user.create({
            data: {
              email: email,
              password: bPassword,
              name: name,
              
            }
          });
    console.log("Succesfully created user")    
    return { success: true };
    
    // redirect('/dashboard');
    
    } catch (error) {
        console.error(error);
      return { success: false, message: "Hiba történt a regisztráció során." };
    }
  }