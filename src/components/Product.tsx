import Image from "next/image";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card";
import { DetailsButton } from "./BuyButton";

export type ProductProps = {
    photo: string;
    alt: string;
    title: string;
    desc: string;
    cost: number;
};

export function Product({ photo, alt, title, cost }: ProductProps) {
    return (
        <Card className="p-2">
            <CardContent className="p-3">
                <Image
                    src={photo}
                    title={alt}
                    alt={alt}
                    width={400}
                    height={400}
                    className="object-cover overflow-hidden aspect-square rounded-2xl"
                />
            </CardContent>
            <CardHeader className="text-center p-3">
                <CardTitle className="text-2xl">{title}</CardTitle>
            </CardHeader>
            <CardFooter className="p-3 flex gap-2">
                <span className="font-bold w-1/4 text-center">{cost}₹ </span>
                <DetailsButton product={alt} title={title} />
            </CardFooter>
        </Card>
    );
}
