import { OrderReset } from "./OrderReset";
import { Product as ProductType } from "../../../data";
import { Product } from "@/components/Product";

export function OrderPage({ products }: { products: ProductType[] }) {
    return (
        <>
            <OrderReset />
            {products.map((order) => (
                <Product key={`${order.id}`} {...order} />
            ))}
        </>
    );
}
