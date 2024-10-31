"use client";
import { cn } from "@/lib/utils";
import { CardTitle, CardDescription } from "@/components/ui/card";
import * as motion from "framer-motion/client";
import { useFetchUserRole } from "@/hooks/useFetchUserRole";
import { useBoundStore } from "@/zustand/store";
import { useRoleInfo } from "@/hooks/useRoleInfo";

type ColorVariant = "neutral" | "rose" | "blue" | "sky";

const transition = { type: "spring", stiffness: 300, damping: 30, mass: 2 };

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
        bg: "bg-card",
        border: "dark:border-neutral-800 border-neutral-200",
        title: "dark:text-neutral-100 text-neutral-900",
        description: "text-neutral-500",
    },
    rose: {
        bg: "dark:bg-rose-950 bg-rose-50",
        border: "dark:border-rose-800 border-rose-200",
        title: "dark:text-rose-100 text-rose-900",
        description: "text-rose-500",
    },
    sky: {
        bg: "dark:bg-sky-950 bg-sky-50",
        border: "dark:border-sky-800 border-sky-200",
        title: "dark:text-sky-100 text-sky-900",
        description: "text-sky-500",
    },
    blue: {
        bg: "dark:bg-blue-950 bg-blue-50",
        border: "dark:border-blue-800 border-blue-200",
        title: "dark:text-blue-100 text-blue-900",
        description: "text-blue-500",
    },
};

function isColorVariant(color: string): color is ColorVariant {
    return ["neutral", "rose", "blue", "sky"].includes(color);
}

export default function RoleCard({
    disabled: propDisabled = false,
    className,
}: RoleCardProps) {
    const { roleInfo } = useBoundStore();
    const isDisabled = propDisabled || !roleInfo;
    const color: ColorVariant =
        roleInfo && roleInfo.color && isColorVariant(roleInfo.color)
            ? roleInfo.color
            : "neutral";
    const { bg, border, title, description } = colorVariants[color];

    useRoleInfo();

    return (
        <motion.div
            className="relative z-50 max-w-sm h-full select-none aspect-[2/3]"
            style={{ perspective: "1000px" }}
        >
            <motion.div
                className="relative h-full w-full"
                whileTap={!isDisabled ? { rotateY: 180 } : undefined}
                transition={transition}
                style={{
                    transformStyle: "preserve-3d",
                }}
                aria-disabled={isDisabled}
            >
                {/* Front Side */}
                <div
                    className={cn(
                        "absolute h-full w-full backface-hidden bg-card border-border flex-col flex items-center justify-center border rounded-md",
                        isDisabled && "opacity-50 cursor-not-allowed",
                        className
                    )}
                    style={{ backfaceVisibility: "hidden" }}
                >
                    <CardTitle className={cn(isDisabled && "opacity-50")}>
                        Tramonto
                    </CardTitle>
                    <CardDescription className={cn(isDisabled && "opacity-50")}>
                        Simple Mafia role assigner
                    </CardDescription>
                </div>

                {/* Back Side */}
                {!isDisabled && (
                    <div
                        className={cn(
                            "absolute h-full w-full backface-hidden flex items-center flex-col  justify-center border rounded-md",
                            bg,
                            border,
                            className
                        )}
                        style={{
                            transform: "rotateY(180deg)",
                            backfaceVisibility: "hidden",
                        }}
                    >
                        <CardTitle className={cn(title)}>
                            {roleInfo?.name}
                        </CardTitle>
                        <CardDescription
                            className={cn(description, "px-4 text-center")}
                        >
                            {roleInfo?.description}
                        </CardDescription>
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
}
