import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { RegisterForm } from "./RegisterForm";

export default async function SignInPage() {
    const session = await auth();
    if (!session?.user.username) {
        return <RegisterForm />;
    }
    redirect("/");
}
