"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { loginSchema } from "@/lib/zod";
import LoadingButton from "@/components/Loading-button";
import { doCredentialRegister } from "@/actions/form-action";
import { useState } from "react";
import ErrorMessage from "@/components/Error-message";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export function RegisterForm() {
    const [globalError, setGlobalError] = useState<string>("");
    const router = useRouter();
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof loginSchema>) => {
        try {
            const result = await doCredentialRegister(values);
            if (result?.message) {
                setGlobalError(result.message);
                return;
            }
            toast({
                variant: "dark",
                duration: 6000,
                title: "Successfully registered!",
                description: "Now login using that account",
            });
            router.push("/login");
        } catch (error) {
            console.log("An unexpected error occurred. Please try again: ", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-center text-gray-800">
                        Welcome to our challenge
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {!!globalError && <ErrorMessage error={globalError} />}
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="Enter username"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Enter password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Submit button will go here */}
                            <LoadingButton
                                pending={form.formState.isSubmitting}
                                text="Register"
                            />
                        </form>
                    </Form>
                    <div className="text-center mt-2">
                        <Link
                            href="/login"
                            className="underline underline-offset-2"
                        >
                            Already have an account?
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
