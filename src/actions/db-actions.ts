"use server";

import { clearOrders } from "@/lib/db";

export async function resetOrders() {
  try {
    const res = await clearOrders();
    return res;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: JSON.stringify(error),
    };
  }
}
