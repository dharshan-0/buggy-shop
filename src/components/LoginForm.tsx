"use client";

import { doCredentialLogin } from "@/actions/form-action";
import { Input } from "./ui/input";

async function handleSubmit(data: FormData) {
  const userDetail = {
    username: data.get("username") as string,
    password: data.get("password") as string
  }
  const response = await doCredentialLogin(userDetail);
  console.log(response);
}

export function LoginForm() {
  return (
    <form action={handleSubmit}>
      <div>
        <label htmlFor="username">Username: </label>
        <Input id="username" type="text" name="username" />
      </div>
      <div>
        <label htmlFor="username">Password: </label>
        <Input id="password" type="password" name="password" />
      </div>
    </form>
  )
}