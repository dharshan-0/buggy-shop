import "server-only";

import { Pool } from "pg";
import { auth } from "@/auth";
import { z } from "zod";
import { data, Product } from "../../data";

const db = new Pool({
  user: process.env.DB_USER_NAME,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432", 10),
});

const orderSchema = z.object({
  id: z.number(),
  product: z.string(),
  cost: z.number(),
});

type DBUser = {
  username: string;
  password: string;
};
export type DBProduct = z.infer<typeof orderSchema>;
export type DBOrder =
  | {
      success: true;
      data: DBProduct[];
    }
  | {
      success: false;
      error: string;
    };
export type Orders =
  | {
      success: true;
      data: Product[];
    }
  | {
      success: false;
      error: string;
    };

export const DB_USER_ALREADY_EXIST_ERROR = "23505";

export const getAll = async () => {
  return db.query("SELECT * from my_user1");
};

type DBUserExist =
  | {
      isUsernameExist: boolean;
      isPasswordExist: boolean;
    }
  | {
      error: string;
    };
export const isUserExist = async ({
  username,
  password,
}: DBUser): Promise<DBUserExist> => {
  try {
    const user_res = await db.query(
      "SELECT * from my_user WHERE username = $1",
      [username]
    );
    const isUsernameExist = user_res.rows.length > 0;
    const pass_res = await db.query(
      "SELECT * from my_user WHERE username = $1 AND password = $2",
      [username, password]
    );
    const isPasswordExist = pass_res.rows.length > 0;
    return {
      isUsernameExist,
      isPasswordExist,
    };
  } catch (e) {
    return {
      error: JSON.stringify(e),
    };
  }
};

export const createUser = async ({ username, password }: DBUser) => {
  return db.query("INSERT INTO my_user (username, password) VALUES ($1, $2)", [
    username,
    password,
  ]);
};

type OrderRes =
  | {
      success: number;
    }
  | { error: string };

export const createOrder = async ({
  product,
  cost,
}: {
  product: string;
  cost: string;
}): Promise<OrderRes> => {
  const session = await auth();
  if (!session?.user) {
    return {
      error: "User not logged in",
    };
  }
  try {
    const res = await db.query(
      "INSERT INTO my_order (product, cost, username) VALUES ($1, $2, $3)",
      [product, cost, session.user.username]
    );
    return {
      success: res.rowCount || 0,
    };
  } catch (e) {
    console.log("error: ", e);
    return {
      error: JSON.stringify(e),
    };
  }
};

export const getOrders = async (): Promise<DBOrder> => {
  const session = await auth();
  if (!session) {
    return {
      success: false,
      error: "User not logged in",
    };
  }

  const { username } = session.user;
  try {
    const res = db.query("SELECT * from my_order WHERE username = $1", [
      username,
    ]);
    const data = (await res).rows;
    const parsedData = orderSchema.array().safeParse(data);
    if (!parsedData.success) {
      return {
        success: false,
        error: JSON.stringify(parsedData.error),
      };
    }

    return {
      success: true,
      data: parsedData.data,
    };
  } catch (e) {
    return {
      success: false,
      error: JSON.stringify(e),
    };
  }
};

export function getProductByAlt(dbData: DBProduct) {
  const product = data.find((p) => p.alt === dbData.product);
  if (!product) {
    throw new Error("Product not found");
  }
  return product;
}

export function dbToProduct(dbOrders: DBOrder): Orders {
  if (dbOrders.success) {
    const products: Array<Product> = [];
    for (const dbOrder of dbOrders.data) {
      const order = getProductByAlt(dbOrder);
      products.push({ ...order, id: dbOrder.id, cost: dbOrder.cost });
    }
    return {
      success: true,
      data: products,
    };
  }
  return {
    success: false,
    error: dbOrders.error,
  };
}

export async function clearOrders() {
  const session = await auth();
  if (!session) {
    return {
      success: false,
      error: "User not logged in",
    };
  }

  const username = session.user.username;
  try {
    const res = await db.query("DELETE FROM my_order WHERE username = $1", [
      username,
    ]);
    return {
      success: true,
      data: res.rowCount,
    };
  } catch (e) {
    return {
      success: false,
      error: JSON.stringify(e),
    };
  }
}
