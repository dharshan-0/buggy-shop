import { auth } from "@/auth";
import { LoginForm } from "./LoginForm";
import { redirect } from "next/navigation";

export default async function SignInPage() {
    const session = await auth();
    if (!session?.user.username) {
        return <LoginForm />;
    }
    redirect("/");
}
