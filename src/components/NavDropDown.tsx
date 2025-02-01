import { doCredentialLogout } from "@/actions/form-action";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Text } from "lucide-react";
import Link from "next/link";

export function NavDropDown() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-0 px-3 py-0 hover:bg-transparent hover:outline hover:outline-2 hover:outline-cyan-50">
                    <Text className=" text-white" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-black/90 border-white/50 text-white/90">
                <DropdownMenuLabel>Navigation</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Link href="/" className="flex-1">Home</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href="/orders" className="flex-1">Orders</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <form action={doCredentialLogout} className="flex-1">
                            <button type="submit" className="w-full text-left" >Log out</button>
                        </form>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
