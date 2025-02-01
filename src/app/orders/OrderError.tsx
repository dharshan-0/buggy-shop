import { Label } from "@radix-ui/react-dropdown-menu";

export function OrderError({ error }: { error: string }) {
    return (
        <div className="flex justify-center min-h-[90vh] items-center">
            <Label className="text-lg text-destructive">{error}</Label>
        </div>
    );
}
