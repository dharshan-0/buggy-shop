import { Suspense } from "react";
import { PurchasePage } from "./PurchasePage";
import { NavBar } from "@/components/Navbar";
import { data } from "../../../data";

export default function Page() {
    return (
        <div className="p-2">
            <NavBar />
            <Suspense fallback={<div>Loading...</div>}>
                <PurchasePage data={data} />;
            </Suspense>
        </div>
    );
}
