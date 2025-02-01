import { dbToProduct, getOrders } from "@/lib/db";
import { OrderLayout } from "./OrderLayout";
import { NavBar } from "@/components/Navbar";
import { Suspense } from "react";
import { OrderLoader } from "./OrderLoader";

export default async function Page() {
    const dbOrders = await getOrders();
    const orders = dbToProduct(dbOrders);

    return (
        <div className="p-2">
            <NavBar />
            <Suspense fallback={<OrderLoader />}>
                <OrderLayout orders={orders} />
            </Suspense>
        </div>
    );
}
