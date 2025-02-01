"use client";

import { resetOrders } from "@/actions/db-actions";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";

export function OrderReset() {
    const router = useRouter();

    async function handler() {
        const res = await resetOrders();
        if (!res.success) {
            toast({
                title: "Error",
                description: res.error,
                variant: "destructive",
            });
        }
        toast({
            title: "Success",
            description: "Orders have been reset",
            variant: "success",
        });
        router.refresh();
    }

    return (
        <form
            className="fixed right-4 bottom-5 sm:right-20 rounded-2xl text-lg "
            action={handler}
        >
            <SubmitButton />
        </form>
    );
}

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button
            className="p-5 border border-emerald-50/50 hover:bg-slate-800"
            type="submit"
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
                    {"Resetting"}
                </div>
            ) : (
                "Reset Orders"
            )}
        </Button>
    );
}
