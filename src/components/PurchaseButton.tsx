"use client";

import { isNumeric } from "@/lib/utils";
import { Button } from "./ui/button";
import { toast } from "@/hooks/use-toast";
import { useTransition } from "react";

type PurchaseButtonProps = {
    product: string;
    user_amount: string;
    cost: number;
    title: string;
};

const onClick = async function (
    product: string,
    user_amount: string,
    cost: number,
) {
    if (!isNumeric(user_amount)) {
        toast({
            variant: "destructive",
            title: "Invalid number",
        });
        return;
    }
    const amount = parseFloat(user_amount);
    if (amount < cost) {
        toast({
            variant: "destructive",
            title: "You entered less than the actual cost",
        });
        return;
    }
    if (amount > cost) {
        toast({
            variant: "destructive",
            title: "You entered more than the actual cost",
        });
        return;
    }
    const url = new URL("buy", location.href);
    const res = await fetch(url.href, {
        method: "POST",
        body: JSON.stringify({
            product,
            amt: cost,
        })
    });
    const data = await res.json();
    if (data.error) {
        toast({
            variant: "destructive",
            title: data.error,
        });
    }
    if (data.success) {
        toast({
            variant: "success",
            title: data.message,
        });
    }
};

export function PurchaseButton({
    product,
    user_amount,
    cost,
    title,
}: PurchaseButtonProps) {
    const [pending, startTransition] = useTransition();

    return (
        <Button
            className="text-xl bg-black w-[clamp(300px,100%,90.333333%)]"
            onClick={() => {
                startTransition(() =>
                    onClick(
                        product,
                        user_amount,
                        cost,
                    )
                );
            }}
            disabled={pending}
        >
            {pending ? (
                <div className="flex items-center justify-center">
                    <svg
                        className="animate-spin h-5 w-5 text-white mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                </div>
            ) : (
                "Buy " + title.toLowerCase()
            )}
        </Button>
    );
}
