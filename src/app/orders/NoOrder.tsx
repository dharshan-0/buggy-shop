import { Label } from "@/components/ui/label";

export function NoOrder() {
    return (
        <div className="flex justify-center min-h-[90vh] items-center">
            <Label className="text-lg">No orders placed yet</Label>
        </div>
    );
}
