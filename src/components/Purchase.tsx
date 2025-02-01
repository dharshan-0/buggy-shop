"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card";
import Image from "next/image";
import { ProductProps } from "./Product";
import { Input } from "./ui/input";
import { PurchaseButton } from "./PurchaseButton";
import { useState } from "react";
import { SessionProvider } from "next-auth/react";
import { toast } from "@/hooks/use-toast";

export function Purchase({ cost, desc, title, photo, alt }: ProductProps) {
    const [userAmount, setUserAmount] = useState<string>("");
    const handler = async (user_amount: string) => {
        if (user_amount.length > 20) {
            toast({
                variant: "destructive",
                title: "You can't type more than 10 digits",
            });
            return;
        }
        setUserAmount(user_amount);
    };
    return (
        <SessionProvider>
            <Card className="p-2 w-[clamp(300px,80%,600px)] mx-auto mt-3">
                <CardContent className="p-3">
                    <Image
                        src={photo}
                        title={alt}
                        alt={alt}
                        width={400}
                        height={400}
                        className="object-cover aspect-square mx-auto rounded-2xl overflow-hidden"
                    />
                </CardContent>
                <CardHeader className="text-center p-3">
                    <CardTitle className="text-2xl">{title}</CardTitle>
                    <CardDescription className="pt-2">{desc}</CardDescription>
                </CardHeader>
                <CardFooter className="p-3 flex gap-2 w-[clamp(300px,80%,83.333333%)] mx-auto">
                    <span className="font-bold w-1/4 text-center text-white bg-black p-2 rounded-md">
                        {cost}₹
                    </span>
                    <Input
                        onChange={(e) => handler(e.target.value)}
                        value={userAmount}
                        placeholder="Enter amount"
                    />
                </CardFooter>
                <div className="flex justify-center">
                    <PurchaseButton
                        user_amount={userAmount}
                        cost={cost}
                        product={alt}
                        title={title}
                    />
                </div>
            </Card>
        </SessionProvider>
    );
}
