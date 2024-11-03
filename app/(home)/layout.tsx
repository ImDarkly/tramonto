import { ThemeSwitcher } from "@/components/theme-switcher";
const { version } = require("../../package.json");

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const isProduction = process.env.NODE_ENV === "production";

    return (
        <main className="h-svh flex flex-col items-center">
            <nav className="w-full flex justify-center items-center h-20">
                <ThemeSwitcher />
            </nav>
            <div className="flex w-full flex-col flex-grow items-center justify-center">
                {children}
            </div>
            <footer className="w-full flex items-center justify-center mx-auto text-center text-xs h-20">
                <p>
                    <a
                        href="https://github.com/ImDarkly/tramonto"
                        className="hover:underline"
                    >
                        Tramonto
                    </a>{" "}
                    <span className="bg-muted px-1 py-0.5 rounded">
                        v{isProduction ? `${version}alpha` : `${version}dev`}
                    </span>{" "}
                    by{" "}
                    <a
                        href="https://github.com/ImDarkly"
                        className="hover:underline"
                    >
                        Baby Came Home
                    </a>
                </p>
            </footer>
        </main>
    );
}
