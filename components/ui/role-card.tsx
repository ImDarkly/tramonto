import { cn } from "@/lib/utils";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

type ColorVariant = "neutral" | "rose" | "blue" | "sky";

interface RoleCardProps extends React.HTMLAttributes<HTMLDivElement> {
    disabled?: boolean;
    color?: ColorVariant;
}

const colorVariants: Record<
    ColorVariant,
    {
        bg: string;
        border: string;
        title: string;
        description: string;
    }
> = {
    neutral: {
        bg: "bg-transparent",
        border: "dark:border-neutral-800 border-neutral-200",
        title: "dark:text-neutral-100 text-neutral-900",
        description: "text-neutral-500",
    },
    rose: {
        bg: "dark:bg-rose-950/50 bg-rose-50",
        border: "dark:border-rose-800 border-rose-200",
        title: "dark:text-rose-100 text-rose-900",
        description: "text-rose-500 ",
    },
    sky: {
        bg: "dark:bg-sky-950/50 bg-sky-50",
        border: "dark:border-sky-800 border-sky-200",
        title: "dark:text-sky-100 text-sky-900",
        description: "text-sky-500",
    },
    blue: {
        bg: "dark:bg-blue-950/50 bg-blue-50",
        border: "dark:border-blue-800 border-blue-200",
        title: "dark:text-blue-100 text-blue-900",
        description: "text-blue-500",
    },
};

export default function RoleCard({
    disabled = false,
    color = "neutral",
    className,
    ...props
}: RoleCardProps) {
    const { bg, border, title, description } = colorVariants[color];

    return (
        <Card
            className={cn(
                `max-w-sm flex flex-col bg-${color}-500 items-center justify-center h-full aspect-[2/3]`,
                bg,
                border,
                disabled && "opacity-50 cursor-not-allowed",
                className
            )}
            aria-disabled={disabled}
            {...props}
        >
            <CardTitle className={cn(title, disabled && "opacity-50")}>
                Tramonto
            </CardTitle>
            <CardDescription
                className={cn(description, disabled && "opacity-50")}
            >
                Simple Mafia role assigner
            </CardDescription>
        </Card>
    );
}
