"use client"

import React, { useState } from "react";
import {
  Input,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createUser } from "../lib/actions";
import toast, { Toaster } from 'react-hot-toast';


export default function SignupCard() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
      const response = await createUser(formData);
      if (response?.success) {
        toast.success("Sikeres regisztráció!");
        
      } else {
        toast.error(response?.message || "Ismeretlen hiba történt.");
      }
    } catch (error) {
      toast.error("Regisztráció sikertelen.");
    }
    
  };

  return (
    <div
      className="flex flex-row w-full items-center justify-center"
      style={{ height: "calc(100vh - 65px)" }}
    >
      <Card className="max-w-full w-[300px] h-[455px]">
        <CardBody className="overflow-hidden">
          <h1 className="text-center mx-auto text-2xl">Register</h1>

          <form
            // action={createUser}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 h-[300px] mt-5"
          >
            <Input
              name="name"
              
              isRequired
              label="Name"
              placeholder="Enter your name"
              type="text"
            />
            <Input
              name="email"
              id="email"
              isRequired
              label="Email"
              placeholder="Enter your email"
              type="email"
            />
            <Input
              name="password"
              id="password"
              isRequired
              label="Password"
              placeholder="Chose your password"
              type="password"
            />
            <Input
              name="password2"
              id="password2"
              isRequired
              label="Password2"
              placeholder="Confirm your password"
              type="password"
            />
            <p className="text-center text-small">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-500 font-bold">
                Login
              </Link>
            </p>
            <div className="flex gap-2 justify-end">
              <Button fullWidth color="default">
                <Link href="/">Back</Link>
              </Button>
              <Button type="submit" fullWidth color="primary">
                Sign up
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
