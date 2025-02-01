import { Orders } from "@/lib/db";
import { OrderPage } from "./OrderPage";
import { NoOrder } from "./NoOrder";
import { OrderError } from "./OrderError";
import { Container } from "@/components/Container";

export function OrderLayout({ orders }: { orders: Orders }) {
    return (
        <>
            {orders.success && orders.data.length > 0 ? (
                <Container>
                    <OrderPage products={orders.data} />
                </Container>
            ) : orders.success ? (
                <NoOrder />
            ) : (
                <OrderError error={orders.error} />
            )}
        </>
    );
}
