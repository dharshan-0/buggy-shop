"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavTitle({
    titles,
    username,
}: {
    titles: Map<string, string>;
    username: string;
}) {
    const pathname = usePathname();
    const title = titles.get(pathname);

    return (
        <Link href={pathname}>
            <h3 className="scroll-m-20 text-white italic text-xl sm:text-2xl font-semibold tracking-tight">
                {pathname === "/" ? `${title} ${username}` : title}
            </h3>
        </Link>
    );
}
