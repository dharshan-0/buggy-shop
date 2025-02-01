export function Container({ children }: { children: React.ReactNode }) {
    return (
        <div className="pt-5 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 sm:max-w-[80%]  mx-auto">
            {children}
        </div>
    );
}
