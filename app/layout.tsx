import { ThemeSwitcher } from "@/components/theme-switcher";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="en"
            className={GeistSans.className}
            suppressHydrationWarning
        >
            <body className="bg-background text-foreground">
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <main className="min-h-screen flex flex-col items-center">
                        <div className="flex-1 w-full flex flex-col gap-20 items-center">
                            <nav className="w-full flex justify-center items-center h-20">
                                <ThemeSwitcher />
                            </nav>
                            <div className="flex flex-col flex-grow gap-20 items-center justify-center max-w-5xl p-5">
                                {children}
                            </div>

                            <footer className="w-full flex items-center justify-center mx-auto text-center text-xs gap-8 h-20">
                                Tramonto by Baby Came Home
                            </footer>
                        </div>
                    </main>
                </ThemeProvider>
            </body>
        </html>
    );
}
