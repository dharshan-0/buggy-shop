import { Container } from "@/components/Container";
import { NavBar } from "@/components/Navbar";
import { ProductSection } from "@/components/ProductSection";

export default function Home() {
    return (
        <>
            <div className="p-2">
                <NavBar />
                <Container>
                    <ProductSection />
                </Container>
            </div>
        </>
    );
}
