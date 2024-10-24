import { ThemeSwitcher } from "@/components/theme-switcher";

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="min-h-screen flex flex-col items-center">
            <nav className="w-full flex justify-center items-center h-20">
                <ThemeSwitcher />
            </nav>
            <div className="flex flex-col flex-grow items-center justify-center">
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
