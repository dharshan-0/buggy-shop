"use server";

import { signIn, signOut } from "../auth";
import { loginSchema } from "@/lib/zod";
import { createUser, DB_USER_ALREADY_EXIST_ERROR, isUserExist } from "@/lib/db";
import { DatabaseError } from "pg";

export async function doCredentialLogin(userDetail: {
  username: string;
  password: string;
}) {
  const parsedUserDetail = loginSchema.safeParse(userDetail);
  if (!parsedUserDetail.success) {
    return { message: "Invalid Credentials!" };
  }

  const isExistRes = await isUserExist(parsedUserDetail.data);
  if ("error" in isExistRes) {
    return { message: isExistRes.error };
  }
  if (isExistRes.isUsernameExist) {
    if (!isExistRes.isPasswordExist) return { message: "Invalid password!" };
  }
  if (!isExistRes.isUsernameExist) {
    return { message: "Invalid username!" };
  }

  try {
    await signIn("credentials", {
      ...userDetail,
      redirect: false,
    });
    if (isExistRes.isPasswordExist) return { success: "Login Success!" };
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message };
    }
    throw error;
  }
}

export async function doCredentialLogout() {
  await signOut();
}

export async function doCredentialRegister(userDetail: {
  username: string;
  password: string;
}) {
  try {
    const parsedUserDetail = loginSchema.safeParse(userDetail);
    if (!parsedUserDetail.success) {
      console.log("Invalid credentials", userDetail, parsedUserDetail);
      return { message: "Invalid Credentials!" };
    }
    const response = await createUser(parsedUserDetail.data);
    const { rowCount, command } = response;
    return { success: true, response: { rowCount, command } };
  } catch (error) {
    if (error instanceof DatabaseError) {
      console.error("Error_: ", { ...error });
      switch (error.code) {
        case DB_USER_ALREADY_EXIST_ERROR:
          return { message: "User already exists!" };
        default:
          return { message: error.message };
      }
    }
    if (error instanceof Error) {
      console.error("Error_: ", { ...error });
      return { message: error.message };
    }
    throw error;
  }
}
