import { auth } from "@/auth";
import { NavDropDown } from "./NavDropDown";
import { NavTitle } from "./NavTitle";

const titles = new Map<string, string>([
    ["/", "Hack me if you can"],
    ["/orders", "Orders"],
    ["/purchase", "Purchase"],
]);

export async function NavBar() {
    const session = await auth();
    if (!session?.user.username) {
        return (
            <>
                <p>Not logged in</p>
            </>
        );
    }
    return (
        <nav className="sticky top-2 nav-shadow max-w-5xl h-12 bg-black mx-auto flex items-center px-2 justify-between rounded-xl">
            <NavTitle username={session.user.username} titles={titles} />
            <NavDropDown />
        </nav>
    );
}
