"use client";

import { useSearchParams } from "next/navigation";
import { Purchase } from "@/components/Purchase";
import { Product } from "../../../data";

export function PurchasePage({ data }: { data: Product[] }) {
    const param = useSearchParams().get("product");
    const product = data.find((p) => p.alt === param);
    return (
        <>
            {!!product ? (
                <Purchase
                    cost={product.cost}
                    desc={product.desc}
                    title={product.title}
                    photo={product.photo}
                    alt={product.alt}
                />
            ) : (
                <div className="flex justify-center items-center h-[85vh]">
                    <p className="text-destructive text-2xl border border-destructive rounded-lg p-4 px-8 bg-destructive/10">
                        No such product found
                    </p>
                </div>
            )}
        </>
    );
}
