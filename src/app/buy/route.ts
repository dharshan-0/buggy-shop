import { createOrder } from "@/lib/db";
import type { NextRequest } from "next/server";
import { data } from "../../../data";
import { isNumeric } from "@/lib/utils";

export async function POST(request: NextRequest) {
  const response = await request.json();
  const resData = JSON.parse(JSON.stringify(response));
  const product = resData.product
  const cost = resData.amt.toString();
  if (!isNumeric(cost)) {
    return Response.json({
      error: "cost must be a number",
    })
  }
  if (!product) {
    return Response.json({
      error: "Missing parameters",
    });
  }
  const db_product = data.find((p) => p.alt === product);
  if (!db_product) {
    return Response.json({
      error: "Product not found",
    });
  }
  try {
    const res = await createOrder({ product, cost });
    if ("error" in res) {
      return Response.json({
        error: res.error,
      });
    }
    const isSuccess = res.success > 0;
    return Response.json({
      success: isSuccess,
      message: "Order placed successfully",
    });
  } catch (err: unknown) {
    if (err instanceof Object) console.log({ ...err });
    return Response.json({
      error: err,
    });
  }
}
